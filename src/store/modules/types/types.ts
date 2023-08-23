import type { RouteRecordRaw } from "vue-router";
import type { CategoryObj, AttrList } from "@/api/product/attr/type";
// 定义仓库数据的state类型
export interface userState {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
  buttons: string[];
}
// 定义attr仓库的数据类型
export interface categoryState {
  c1Id: string | number;
  c1Arr: CategoryObj[];
  c2Id: string | number;
  c2Arr: CategoryObj[];
  c3Id: string | number;
  c3Arr: CategoryObj[];
  arrList: AttrList;
}
