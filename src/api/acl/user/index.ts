import request from "@/utils/request";
import { UserReponseData, RoleReponseData, SetRoleData } from "./type";
enum API {
  // 获取全部的已有账户信息
  ALLUSER_URL = "/admin/acl/user",
  // 添加用户
  ADDUSER_URL = "/admin/acl/user/save",
  // 修改用户
  UPDATEUSER_URL = "/admin/acl/user/update",
  // 获取当前用户的角色和所有的角色信息
  ALLROLEURL = "/admin/acl/user/toAssign",
  // 给已有的用户分配角色
  EDITROLEURL = "/admin/acl/user/doAssignRole",
  // 删除用户(单个)
  DELETEUSER_URL = "/admin/acl/user/remove",
  // 批量删除用户
  DELETEBATCHUSER_URL = "/admin/acl/user/batchRemove",
}
// 获取用户列表
export const getAllUser = (page: number, limit: number, name: string) => {
  return request({
    url: API.ALLUSER_URL + `/${page}/${limit}/` + `?username=${name}`,
    method: "GET",
  }) as Promise<UserReponseData>;
};

// 添加或修改用户
export const addUser = (data: any) => {
  if (data.id) {
    return request({
      url: API.UPDATEUSER_URL,
      method: "PUT",
      data,
    }) as Promise<any>;
  } else {
    return request({
      url: API.ADDUSER_URL,
      method: "POST",
      data,
    }) as Promise<any>;
  }
};
// 获取当前用户的角色和所有的角色信息
export const getAllRole = (userId: string) => {
  return request({
    url: API.ALLROLEURL + `/${userId}`,
    method: "GET",
  }) as Promise<RoleReponseData>;
};
// 给已有的用户分配角色
export const editRole = (data: SetRoleData) => {
  return request({
    url: API.EDITROLEURL,
    data,
    method: "POST",
  }) as Promise<any>;
};
// 删除用户(单个)
export const deleteUser = (id: string) => {
  return request({
    url: API.DELETEUSER_URL + `/${id}`,
    method: "DELETE",
  }) as Promise<any>;
};
// 删除用户(批量)
export const deleteBatchUser = (idList: string[] | number[]) => {
  return request({
    url: API.DELETEBATCHUSER_URL,
    method: "DELETE",
    data: idList,
  }) as Promise<any>;
};
