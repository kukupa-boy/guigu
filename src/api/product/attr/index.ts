import request from "@/utils/request";
import {
  CategoryResponseData,
  AttrResponseData,
  Attr,
} from "@/api/product/attr/type";
// 属性管理模块的接口
enum API {
  // 获取一级分类的接口
  GET_CATEGORY1 = "/admin/product/getCategory1",
  // 获取二级分类
  GET_CATEGORY2 = "/admin/product/getCategory2",
  // 获取三级分类
  GET_CATEGORY3 = "/admin/product/getCategory3",
  // 获取属性列表
  GET_ATTR_LIST = "/admin/product/attrInfoList",
  // 添加或者修改已有属性的接口
  ADD_OR_UPDATE_ATTR = "/admin/product/saveAttrInfo",
  // 删除属性列表
  DELETE_ATTR = "/admin/product/deleteAttr",
}

// 获取一级分类的方法
export function getCategory1() {
  return request({
    url: API.GET_CATEGORY1,
    method: "get",
  }) as Promise<CategoryResponseData>;
}
// 获取二级分类的方法（ 需要获取一级分类的id）
export function getCategory2(category1Id: string | number) {
  return request({
    url: API.GET_CATEGORY2 + "/" + category1Id,
    method: "get",
  }) as Promise<CategoryResponseData>;
}
// 获取三级分类的方法（ 需要获取二级分类的id）
export function getCategory3(category2Id: string | number) {
  return request({
    url: API.GET_CATEGORY3 + "/" + category2Id,
    method: "get",
  }) as Promise<CategoryResponseData>;
}
// 获取属性列表的方法
export function getAttrList(
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number
) {
  return request({
    url:
      API.GET_ATTR_LIST +
      "/" +
      category1Id +
      "/" +
      category2Id +
      "/" +
      category3Id,
    method: "get",
  }) as Promise<AttrResponseData>;
}

// 添加或者修改已有属性的方法
export function addOrUpdateAttr(data: Attr) {
  return request({
    url: API.ADD_OR_UPDATE_ATTR,
    method: "post",
    data,
  }) as Promise<any>;
}

// 删除属性列表的方法
export function deleteAttr(attrId: string | number) {
  return request({
    url: API.DELETE_ATTR + "/" + attrId,
    method: "delete",
  }) as Promise<any>;
}
