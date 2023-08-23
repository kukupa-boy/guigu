import request from "@/utils/request";
import { RoleResponseData, Role, MenuResponseData } from "./type";
enum API {
  // 获取角色列表
  ALLROLE_URL = "/admin/acl/role",
  // 新增角色
  ADDROLE_URL = "/admin/acl/role/save",
  // 更新角色
  UPDATEROLE_URL = "/admin/acl/role/update",
  // 获取全部菜单和按钮的数据
  ALLPERMISSION = "/admin/acl/permission/toAssign",
  // 给角色分配权限
  ASSIGNROLEPERMISSION = "/admin/acl/permission/doAssign/?",
  // 删除角色
  DELETEROLE_URL = "/admin/acl/role/remove/",
}
export function getRoleList(page: number, limit: number, roleName?: string) {
  return request({
    url: `${API.ALLROLE_URL}/${page}/${limit}/?roleName=${roleName}`,
    method: "GET",
  }) as Promise<RoleResponseData>;
}

// 更新或者新增角色
export function addOrUpdateRole(data: Role) {
  if (data.id) {
    return request({
      url: API.UPDATEROLE_URL,
      method: "PUT",
      data,
    }) as Promise<any>;
  } else {
    return request({
      url: API.ADDROLE_URL,
      method: "POST",
      data,
    }) as Promise<any>;
  }
}
// 根据角色id获取角色的权限
export function getRolePermission(roleId: string | number) {
  return request({
    url: `${API.ALLPERMISSION}/${roleId}`,
    method: "GET",
  }) as Promise<MenuResponseData>;
}

// 给角色分配权限
export function assignRolePermission(
  roleId: string | number,
  permissionId: number[]
) {
  return request({
    url: `${API.ASSIGNROLEPERMISSION}roleId=${roleId}&permissionId=${permissionId}`,
    method: "POST",
  }) as Promise<any>;
}
// 删除角色
export function deleteRoleFn(roleId: string | number) {
  return request({
    url: `${API.DELETEROLE_URL}${roleId}`,
    method: "DELETE",
  }) as Promise<any>;
}
