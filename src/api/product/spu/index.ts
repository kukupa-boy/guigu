import request from "@/utils/request";
import {
  SpuListData,
  BrandListData,
  SpuImagesData,
  SaleAttrListData,
  HasSaleAttrResponseDate,
  SpuData,
  SkuData,
  SkuListData,
} from "./type";
enum API {
  // 获取spu列表
  HASSPU_URL = "/admin/product",
  // 获取全部品牌的数据
  BRAND_URL = "/admin/product/baseTrademark/getTrademarkList",
  // 获取某个spu下的全部的售卖商品的图片数据
  IMAGES_URL = "/admin/product/spuImageList",
  // 获取spu销售属性列表
  SALE_ATTR_URL = "/admin/product/spuSaleAttrList",
  // 获取整个项目的全部销售属性
  BASE_SALE_ATTR_URL = "/admin/product/baseSaleAttrList",
  // 追加新的spu
  ADD_SPU_URL = "/admin/product/saveSpuInfo",
  // 更新spu
  UPDATE_SPU_URL = "/admin/product/updateSpuInfo",
  // 追加sku
  ADD_SKU_URL = "/admin/product/saveSkuInfo",
  // 获取一个spu下面的sku列表
  SKUINFO_URL = "/admin/product/findBySpuId",
  // 删除spu
  DELETE_SPU_URL = "/admin/product/deleteSpu",
}

// 获取spu列表
export function getHasSpuList(
  page: number,
  limit: number,
  category3Id: string | number
) {
  return request({
    url: API.HASSPU_URL + `/${page}/${limit}?category3Id=${category3Id}`,
    method: "GET",
  }) as Promise<SpuListData>;
}
// 获取全部品牌的数据
export function getBrandList() {
  return request({
    url: API.BRAND_URL,
    method: "GET",
  }) as Promise<BrandListData>;
}
// 获取某个spu下的全部的售卖商品的图片数据
export function getImagesList(spuId: string | number) {
  return request({
    url: API.IMAGES_URL + `/${spuId}`,
    method: "GET",
  }) as Promise<SpuImagesData>;
}
// 获取spu销售属性列表
export function getSaleAttrList(spuId: string | number) {
  return request({
    url: API.SALE_ATTR_URL + `/${spuId}`,
    method: "GET",
  }) as Promise<SaleAttrListData>;
}
// 获取整个项目的全部销售属性
export function getBaseSaleAttrList() {
  return request({
    url: API.BASE_SALE_ATTR_URL,
    method: "GET",
  }) as Promise<HasSaleAttrResponseDate>;
}

// 追加更新新的spu
export function addOrUpdateSpu(data: SpuData) {
  let url = "";
  if (data.id) {
    url = API.UPDATE_SPU_URL;
  } else {
    url = API.ADD_SPU_URL;
  }
  return request({
    url,
    method: "POST",
    data,
  }) as Promise<any>;
}
// 追加sku
export function addSku(data: SkuData) {
  return request({
    url: API.ADD_SKU_URL,
    method: "POST",
    data,
  }) as Promise<any>;
}

// 获取一个spu下面的sku列表
export function getSkuList(spuId: string | number) {
  return request({
    url: API.SKUINFO_URL + `/${spuId}`,
    method: "GET",
  }) as Promise<SkuListData>;
}
// 删除spu
export function deleteSpu(spuId: string | number) {
  return request({
    url: API.DELETE_SPU_URL + `/${spuId}`,
    method: "DELETE",
  }) as Promise<any>;
}
