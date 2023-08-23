export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface SkuAttrValue {
  attrId: number | string; // 属性id
  valueId: number | string; // 属性值ID
  id?: number | string;
  valueName?: string;
}
export interface SkuSaleValue {
  saleAttrId: number | string; // 销售属性id
  saleAttrValueId: number | string; // 销售属性值id
  id?: number | string;
  saleAttrValueName?: string;
}
export interface SpuImg {
  id?: number | string;
  skuId?: number | string;
  imgName?: string;
  createTime?: null | string;
  imgUrl?: string;
  isDefault?: null | boolean;
  updateTime?: null | string;
  spuImgId?: number | string;
}
export interface SkuData {
  category3Id: number | string;
  spuId: number | string;
  skuName: string;
  tmId: number | string;
  price: string | number;
  weight: string | number;
  skuDesc: string;
  skuAttrValueList?: SkuAttrValue[]; //平台属性
  skuSaleAttrValueList?: SkuSaleValue[]; //销售属性
  skuDefaultImg: string;
  skuImageList?: SpuImg[];
}
// 获取sku列表
export interface SkuListData extends ResponseData {
  data: {
    records: SkuData[];
    total: number;
    size: number;
    current: number;
    orders: any[];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: any;
    maxLimit: any;
    searchCount: boolean;
    pages: number;
  };
}
// sku详情
export interface SkuInfoData extends ResponseData {
  data: SkuData;
}
