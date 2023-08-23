import { defineStore } from "pinia";
import {
  getCategory1,
  getCategory2,
  getCategory3,
  getAttrList,
} from "@/api/product/attr";
import { ElMessage } from "element-plus";
import type {
  CategoryResponseData,
  AttrResponseData,
} from "@/api/product/attr/type";
import type { categoryState } from "@/store/modules/types/types";
export const useCategoryStore = defineStore({
  id: "category",
  state: (): categoryState => ({
    // 存储一级分类的id
    c1Id: "",
    // 存储一级分类的数据
    c1Arr: [],
    // 存储二级分类的id
    c2Id: "",
    // 存储二级分类的数据
    c2Arr: [],
    // 存储三级分类的id
    c3Id: "",
    // 存储三级分类的数据
    c3Arr: [],
    // 存储属性列表的数据
    arrList: [],
  }),
  actions: {
    // 获取一级分类
    async getCategoryList() {
      const result: CategoryResponseData = await getCategory1();
      if (result.code === 200) {
        this.c1Arr = [];
        this.c2Arr = [];
        this.c3Arr = [];
        this.c1Id = "";
        this.c2Id = "";
        this.c3Id = "";
        this.c1Arr = result.data;
      } else {
        ElMessage.error("获取一级分类失败");
        return [];
      }
    },
    // 获取二级分类
    async getCategory2List() {
      const result: CategoryResponseData = await getCategory2(this.c1Id);
      if (result.code === 200) {
        this.c2Arr = [];
        this.c3Arr = [];
        this.c2Id = "";
        this.c3Id = "";
        this.c2Arr = result.data;
      } else {
        ElMessage.error("获取二级分类失败");
        return [];
      }
    },
    // 获取三级分类
    async getCategory3List() {
      const result: CategoryResponseData = await getCategory3(this.c2Id);
      if (result.code === 200) {
        this.c3Arr = [];
        this.c3Id = "";
        this.c3Arr = result.data;
      } else {
        ElMessage.error("获取三级分类失败");
        return [];
      }
    },
    // 获取属性列表
    async getAttrList() {
      const result: AttrResponseData = await getAttrList(
        this.c1Id,
        this.c2Id,
        this.c3Id
      );
      if (result.code === 200) {
        this.arrList = result.data;
      } else {
        ElMessage.error("获取属性列表失败");
        return [];
      }
    },
  },
});
