export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 品牌的数据类型
export interface TradeMark {
  id?: number;
  logoUrl: string;
  tmName: string;
}

// 包含全部品牌数据的ts类型
export type Records = TradeMark[];

// 获取已有全部品牌数据的ts类型
export interface TradeMarkList extends ResponseData {
  data: {
    records: Records;
    total: number;
    size: number;
    pages: number;
    current: number;
    searchCount: boolean;
  };
}

// 品牌数据中的tabledata
export interface TableData {
  total: number;
  limit: number;
  page: number;
  list: Records;
}
