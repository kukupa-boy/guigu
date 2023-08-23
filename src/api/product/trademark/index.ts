// 管理商品相关的接口
import request from "@/utils/request";
import type { TradeMarkList, TradeMark } from "./type";
// 用户登录接口
enum API {
  // 品牌编辑
  UPDATE_TRADEMARK = "/admin/product/baseTrademark/update",
  // 品牌添加
  SAVE_TRADEMARK = "/admin/product/baseTrademark/save",
  // 品牌列表
  GET_TRADEMARK_LIST = "/admin/product/baseTrademark",
  // 品牌删除
  DELETE_TRADEMARK = "/admin/product/baseTrademark/remove",
}
// 获取品牌管理list
export function getTradeMarkList(page: number, limit: number) {
  return request({
    url: API.GET_TRADEMARK_LIST + `/${page}/${limit}`,
    method: "get",
  }) as Promise<TradeMarkList>;
}

// 添加or修改品牌
export function saveOrUpdateTradeMark(data?: TradeMark) {
  if (!data.id) {
    return request({
      url: API.SAVE_TRADEMARK,
      method: "post",
      data,
    }) as Promise<any>;
  } else {
    return request({
      url: API.UPDATE_TRADEMARK,
      method: "put",
      data,
    }) as Promise<any>;
  }
}

// 删除品牌
export function deleteTradeMark(id: number) {
  return request({
    url: API.DELETE_TRADEMARK + `/${id}`,
    method: "delete",
  }) as Promise<any>;
}
