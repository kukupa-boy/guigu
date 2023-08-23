<script setup lang="ts">
import { onMounted } from "vue";
import { useCategoryStore } from "@/store/modules/category";

let store = useCategoryStore();
onMounted(() => {
  store.getCategoryList();
});
// 点击第一个下拉框
const getCategory1Fn = () => {
  store.getCategory2List();
};
// 点击第二个下拉框
const getCategory2Fn = () => {
  store.getCategory3List();
};
// 点击第三个下拉框
const getCategory3Fn = () => {
  console.log("finish");
};
const props = defineProps({
  scene: Number,
});
</script>

<template>
  <el-form :inline="true" :model="store" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select
        v-model="store.c1Id"
        placeholder="请选择分类"
        @change="getCategory1Fn()"
        :disabled="props.scene === 1 || props.scene === 2"
      >
        <!-- 直接绑定store，也可以 -->
        <template v-for="item in store.c1Arr" :key="item.id">
          <el-option :label="item.name" :value="item.id" />
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        v-model="store.c2Id"
        placeholder="请选择分类"
        @change="getCategory2Fn()"
        :disabled="props.scene === 1 || props.scene === 2"
      >
        <template v-for="item in store.c2Arr" :key="item.id">
          <el-option :label="item.name" :value="item.id" />
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        v-model="store.c3Id"
        placeholder="请选择分类"
        @change="getCategory3Fn()"
        :disabled="props.scene === 1 || props.scene === 2"
      >
        <template v-for="item in store.c3Arr" :key="item.id">
          <el-option :label="item.name" :value="item.id" />
        </template>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
