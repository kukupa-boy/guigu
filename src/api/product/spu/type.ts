export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface SpuData {
  id?: number;
  spuName: string;
  description: string;
  category3Id: number | string;
  tmId: number | string; // 品牌id
  spuSaleAttrList: null | SaleAttrObj[]; // 销售属性
  spuImageList: null | SpuImg[]; // 图片列表
  updateTime?: null | string;
  createTime?: null | string;
}

// 数组：元素都是一有spu的数据类型
export type records = SpuData[];

// spu列表的数据类型
export interface SpuListData extends ResponseData {
  data: {
    records: records;
    total: number;
    size: number;
    current: number;
    pages: number;
    searchCount: boolean;
  };
}

// 所有品牌的数据类型
export interface Trademark {
  id: number;
  logoUrl: string;
  tmName: string;
}
// 品牌列表的数据类型
export interface BrandListData extends ResponseData {
  data: Trademark[];
}
// 上传图片列表中存在response表示上传成功的地址存放
export interface ResponseUrlData {
  data: string;
}
// 商品图片的数据类型
export interface SpuImg {
  id?: number;
  spuId?: number;
  imgName?: string;
  imgUrl?: string;
  response?: any;
  url?: string;
  name?: string;
  createTime?: null | string;
  updateTime?: null | string;
  isDefault?: null | boolean; // sku设置默认图片
}
// 已有的spu照片墙的数据类型
export interface SpuImagesData extends ResponseData {
  data: SpuImg[];
}
// 销售属性值
export interface SaleAttr {
  id?: number | string;
  spuId?: number;
  saleAttrName?: string;
  saleAttrValueName: string;
  createTime?: null | string;
  updateTime?: null | string;
  isChecked?: null | boolean;
  baseSaleAttrId?: number;
}

// 销售属性的数组类型
export type saleAttrList = SaleAttr[];

// 销售属性对象
export interface SaleAttrObj {
  id?: number;
  spuId?: number;
  inputVisible?: boolean;
  saleAttrName: string;
  spuSaleAttrValueList?: saleAttrList;
  baseSaleAttrId: number;
  createTime?: null | string;
  updateTime?: null | string;
  selectSaleAttrValue?: string; // 用于收集sku销售属性的value
}

// 销售属性列表的数据类型
export interface SaleAttrListData extends ResponseData {
  data: SaleAttrObj[];
}

// 已有的全部spu的返回数据ts类型
export interface HasSaleAttr {
  id: number;
  name: string;
}
export interface HasSaleAttrResponseDate extends ResponseData {
  data: HasSaleAttr[];
}
export interface SkuAttrValue {
  attrId: number | string; // 属性id
  valueId: number | string; // 属性值ID
}
export interface SkuSaleValue {
  saleAttrId: number | string; // 销售属性id
  saleAttrValueId: number | string; // 销售属性值id
}
// sku data
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
}

// spu下的sku列表数据类型
export interface SkuListData extends ResponseData {
  data: SkuData[];
}
