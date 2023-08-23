export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
// 职位数据类型
export interface Role {
  id?: number | string;
  roleName: string;
  updateTime?: string;
  createTime?: string;
  remark?: null | string;
}
// 全部职位的数组的ts数据类型
export type Records = Role[];

// 返回的角色分页数据类型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

// 菜单与按钮的数据类型
export interface MenuData {
  id: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null | string;
  level: number;
  children: MenuData[]; // 注意这一步，相当于递归
  select: boolean;
}

export type MenuList = MenuData[];
// 返回的菜单与按钮的数据类型
export interface MenuResponseData extends ResponseData {
  data: MenuList;
}
