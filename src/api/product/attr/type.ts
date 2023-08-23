// 分类的ts数据类型

export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface CategoryObj {
  id: number | string;
  name: string;
  catgeory1Id?: number | string;
  catgeory2Id?: number | string;
}
// 分类接口返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[];
}

// 属性列表的数据类型
// 属性值的数据类型
export interface AttrValueObj {
  id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean;
}
// 存储属性值的数据类型
export type AttrValueList = AttrValueObj[];

// 属性对象
export interface Attr {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
  selectPlateformValue?: string; // 用于收集sku平台属性的value
}

// 存储每一个属性对象的数组ts类型
export type AttrList = Attr[];

// 属性列表返回的数据类型
export interface AttrResponseData extends ResponseData {
  data: Attr[];
}
