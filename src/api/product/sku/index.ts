import request from "@/utils/request";
enum API {
  // 获取sku列表
  SKU_LIST = "/admin/product/list",
  // 商品上架
  SKU_UP = "/admin/product/onSale",
  // 商品下架
  SKU_DOWN = "/admin/product/cancelSale",
  // 商品信息
  SKU_INFO = "/admin/product/getSkuInfo",
  // 删除sku
  SKU_DELETE = "/admin/product/deleteSku",
}
import type { SkuListData, SkuInfoData } from "./type";
// 获取sku列表
export function getSkuList(page: number, limit: number) {
  return request({
    url: API.SKU_LIST + `/${page}/${limit}`,
    method: "get",
  }) as Promise<SkuListData>;
}
// 商品上架
export function skuUp(skuId: number) {
  return request({
    url: API.SKU_UP + `/${skuId}`,
    method: "get",
  }) as Promise<any>;
}
// 商品下架
export function skuDown(skuId: number) {
  return request({
    url: API.SKU_DOWN + `/${skuId}`,
    method: "get",
  }) as Promise<any>;
}
// 商品信息
export function getSkuInfo(skuId: number) {
  return request({
    url: API.SKU_INFO + `/${skuId}`,
    method: "get",
  }) as Promise<SkuInfoData>;
}

// 删除sku
export function deleteSku(skuId: number) {
  return request({
    url: API.SKU_DELETE + `/${skuId}`,
    method: "delete",
  }) as Promise<any>;
}
