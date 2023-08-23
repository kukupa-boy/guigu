import request from "@/utils/request";
import { MenuResponseData, addDataTypes } from "./type";
enum API {
  // 获取全部的菜单和按钮的数据
  ALLPERMISSION_URL = "/admin/acl/permission",
  // 添加或者添加功能
  ADDPERMISSION_URL = "/admin/acl/permission/save", // post
  // 更新菜单
  UPDATEPERMISSION_URL = "/admin/acl/permission/update", // put
  // 删除菜单
  DELETEPERMISSION_URL = "/admin/acl/permission/remove", // delete
}

// 获取全部的菜单和按钮的数据
export function reqAllPermission() {
  return request({
    url: API.ALLPERMISSION_URL,
    method: "GET",
  }) as Promise<MenuResponseData>;
}
// 添加与更新菜单
export function reqAddOrUpdatePermission(data: addDataTypes) {
  if (data.id) {
    return request({
      url: API.UPDATEPERMISSION_URL,
      method: "PUT",
      data,
    }) as Promise<any>;
  } else {
    return request({
      url: API.ADDPERMISSION_URL,
      method: "POST",
      data,
    }) as Promise<any>;
  }
}
// 删除菜单
export function reqDeletePermission(id: number) {
  return request({
    url: `${API.DELETEPERMISSION_URL}/${id}`,
    method: "DELETE",
  }) as Promise<any>;
}
