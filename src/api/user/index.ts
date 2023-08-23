// 管理用户相关的接口
import request from "@/utils/request";
import type { LoginData, LoginResultModel, UserInfoResultModel } from "./types";
// 用户登录接口
enum API {
  LOGIN_URL = "/admin/acl/index/login", //
  USER_INFO_URL = "/admin/acl/index/info", //
  LOGIN_OUT = "/admin/acl/index/logout", //
}
// 暴露请求函数

// 用户登录接口
export function login(data: LoginData) {
  return request({
    url: API.LOGIN_URL,
    method: "post",
    data,
  }) as Promise<LoginResultModel>;
  //   return request.post<any, LoginResultModel>(API.LOGIN_URL, data); //第一个any表示响应的数据类型，第二个表示返回的数据结构的类型
}

// 获取用户信息
export function getUserInfo(data) {
  return request({
    url: API.USER_INFO_URL,
    method: "get",
    params: {
      token: data,
    },
  }) as Promise<UserInfoResultModel>;
}

// 退出登录
export function loginOut() {
  return request({
    url: API.LOGIN_OUT,
    method: "post",
  });
}
