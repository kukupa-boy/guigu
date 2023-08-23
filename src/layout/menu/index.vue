<script setup lang="ts">
// 获取父组件传递的路由数组
import { useRouter } from "vue-router";

const router = useRouter();

defineProps<{
  menuList: any[];
}>();
const goRoute = (route: any) => {
  // console.log(route.index);
  // 路由跳转
  router.push(route.index);
};
</script>
<script lang="ts">
// 递归组件必须有name属性
export default {
  name: "MyMenu",
};
</script>
<template>
  <template v-for="item in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
        :index="item.children[0].path"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <el-sub-menu
      v-if="item.children && item.children.length > 1"
      :index="item.path"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item-group :index="item.path">
        <MyMenu :menuList="item.children" />
      </el-menu-item-group>
    </el-sub-menu>
  </template>
</template>

<style scoped lang="scss"></style>
