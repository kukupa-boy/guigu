// 创建用户相关的小仓库
import { defineStore } from "pinia";
import { login, getUserInfo, loginOut } from "@/api/user";
import router from "@/router";

import type {
  LoginData,
  LoginResultModel,
  UserInfoResultModel,
} from "@/api/user/types";
import type { userState } from "./types/types.ts";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRoutes, asyncRoutes, anyRoutes } from "@/router/routes";
import cloneDeep from "lodash/cloneDeep";
// 筛选路由
function filterRouteAsync(asyncRoute: any, routes: any) {
  // 将请求后的数据和ayncRoutes进行比对，如果有就添加到routes中
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterRouteAsync(item.children, routes);
      }
      return true;
    }
  });
}
const useUserStore = defineStore("user", {
  state: (): userState => ({
    token: GET_TOKEN() || "",
    menuRoutes: constantRoutes,
    username: "",
    avatar: "",
    buttons: [], //按钮权限
  }),
  getters: {},
  actions: {
    async userLogin(data: LoginData) {
      const result: LoginResultModel = await login(data);
      if (result.code === 200) {
        // pinia不能持久化存储（比如浏览器刷新就没有了）
        if (result.data) {
          //  if (result.data.token) { 这里也可以使用类型断言  result.data.token as string
          this.token = result.data;
          // 本地存储
          SET_TOKEN(result.data);
          return true; // 这里的async函数不return也会返回一个promise的fulfilled的对象
        }
      } else {
        return Promise.reject(new Error(result.data)); // 返回一个rejected的promise对象
      }
    },
    async getUserInfo() {
      const result: UserInfoResultModel = await getUserInfo(this.token);
      if (result.code === 200) {
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        this.buttons = result.data.buttons;
        // 深拷贝不改变原来的async的值，不然每次登陆可能出现值少的情况
        const userAsyncRoute: any = filterRouteAsync(
          cloneDeep(asyncRoutes),
          result.data.routes
        );
        console.log("userAsyncRoute", userAsyncRoute);
        this.menuRoutes = [...constantRoutes, ...userAsyncRoute, ...anyRoutes];
        [...userAsyncRoute, ...anyRoutes].forEach((route: any) => {
          router.addRoute(route); // 将路由添加到route中
        });
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async clearToken() {
      const result: any = await loginOut();
      if (result.code == 200) {
        REMOVE_TOKEN();
        this.token = "";
        this.username = "";
        this.avatar = "";
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    // 清除当前信息（用于用户修改自己的信息的时候，跳转到登陆页）
    async clearUser() {
      this.token = "";
      this.username = "";
      this.avatar = "";
      return "ok";
    },
  },
});
export default useUserStore;
