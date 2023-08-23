// 定义全部接口都拥有的数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 登陆接口需要的数据类型
export interface LoginData {
  username: string;
  password: string;
}
// 登陆接口返回的数据类型
export interface LoginResultModel extends ResponseData {
  data: string;
}
interface dataUserInfoTypes {
  avatar: string;
  name: string;
  roles: string[];
  buttons: string[];
  routes: string[];
}
// 获取用户信息接口返回的数据类型
export interface UserInfoResultModel extends ResponseData {
  data: dataUserInfoTypes;
}
