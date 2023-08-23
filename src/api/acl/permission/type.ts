export interface ResponseData {
  code: number;
  message: string;
  ok: true;
}
// 菜单数据和按钮数据
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

export interface addDataTypes {
  name: string;
  code: string;
  id?: number;
  level: number;
  pid: number;
}
