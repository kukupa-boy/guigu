export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
// 用户信息代表一个账号的信息
export interface User {
  id?: string;
  createTime?: string;
  updateTime?: string;
  username?: string;
  password?: string;
  name: string;
  phone?: string;
  roleName?: string;
}
// 数组包含全部的用户信息
export type Records = User[];

// 用户信息列表
export interface UserReponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    pages: number;
  };
}

// 角色信息
export interface Role {
  id?: number;
  roleName: string;
  createTime?: string;
  updateTime?: string;
  remark: null;
}

export type ALLROLE = Role[];
// 接口返回的全部职位列表
export interface RoleReponseData extends ResponseData {
  data: {
    assignRoles: ALLROLE;
    allRolesList: ALLROLE;
  };
}

// 给已有的用户分配角色
export interface SetRoleData {
  userId: string | number;
  roleIdList: number[];
}
