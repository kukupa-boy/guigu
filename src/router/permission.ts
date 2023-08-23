// 路由能不能被访问的权限设置
// login登陆后不能访问，其他的都可以访问
// 其他路由不能在没有登陆的情况下访问
// 其他路由只有在拿到用户信息的情况下才能访问（其他页面刷新用户数据丢失的问题）
import router from "@/router/index.ts";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import useStoreUser from "@/store/modules/user";
import pinia from "@/store/index.ts";
import { watch } from "vue";
nProgress.configure({ showSpinner: false }); // 配置进度条的时候不显示右边的圈圈
// 在组件外面使用小仓库，需要引入pinia
const storeUser = useStoreUser(pinia);
let token = storeUser.token;
let username = storeUser.username;
watch(storeUser, () => [
  (token = storeUser.token),
  (username = storeUser.username),
]);
router.beforeEach(async (to: any, from: any, next: any) => {
  console.log("from", from);
  nProgress.start();
  if (token) {
    // 登陆成功，跳转login页面，直接跳转到首页
    if (to.path === "/login") {
      next("/"); // 首页可以获取到用户信息
    } else {
      if (username) {
        console.log("1");
        next();
      } else {
        // 没有用户信息去获取用户信息再放行
        try {
          await storeUser.getUserInfo();
          console.log("进入这里");
          // 页面刷新可能会空白，因为异步路由还没有加载完毕就开始访问，导致页面出来不了的情况 ，使用...to
          next({ ...to, replace: true }); //加载完毕才放行
        } catch (e) {
          // 获取用户信息失败(token过期,用户信息被篡改)
          await storeUser.clearToken();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    // 没有登陆
    if (to.path === "/login") {
      next();
    } else {
      next("/login");
    }
  }
});

router.afterEach((to: any) => {
  // 设置网站的title信息
  document.title = to.meta.title;
  nProgress.done();
  // to and from are both route objects. must call `next`.
});
