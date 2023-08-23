<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";
const layoutSettingStore = useLayoutSettingStore();
const route: any = useRoute();
console.log("route", route);
const changeIcon = () => {
  layoutSettingStore.toggleFold();
};
</script>

<script lang="ts">
export default {
  name: "Breadcrumb",
};
</script>

<template>
  <el-icon class="el-icon" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- v-show解决layout显示的问题 -->
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="item.meta.path"
      v-show="item.meta.title !== 'layout'"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.el-icon {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
