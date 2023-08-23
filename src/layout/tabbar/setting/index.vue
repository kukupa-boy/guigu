<script setup lang="ts">
import useSettingStore from "@/store/modules/setting";
import userStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
let user: any = userStore();
let useSetting = useSettingStore();
let router = useRouter();
let route = useRoute();
let color1 = ref("#ffffff");
let isDark = ref(false);
let drawer = ref(false);
const refresh = () => {
  useSetting.toggleRefresh();
};
const fullscreen = () => {
  // 判断当前是否处于全屏模式下
  let full = document.fullscreenElement;
  if (full) {
    // 退出全屏
    document.exitFullscreen();
  } else {
    // 进入全屏
    document.documentElement.requestFullscreen();
  }
};
// 退出登陆
const quit = async () => {
  // 清除token(告诉服务器当前token已经失效)
  await user.clearToken();
  // 将当前退出的route的路径带回给login页面(redierct参数携带)
  router.push({ path: "/login", query: { redirect: route.path } });
};
const openDrawer = () => {
  drawer.value = true;
};
// 暗黑模式切换
const changeDark = (val: boolean) => {
  let html = document.querySelector("html");
  if (val) {
    html?.classList.add("dark");
  } else {
    html?.classList.remove("dark");
  }
};
//主题颜色的设置
const changeTheme = (val: string) => {
  let html = document.querySelector("html");
  color1.value = val;
  html?.style.setProperty("--el-color-primary", val);
};
</script>
<script lang="ts">
export default {
  name: "Setting",
};
</script>
<template>
  <!-- 刷新组件 ，销毁路由组件，重新发起请求 -->
  <el-button icon="RefreshRight" size="small" circle @click="refresh" />
  <!-- 全屏模式 -->
  <el-button icon="FullScreen" size="small" circle @click="fullscreen" />
  <el-button icon="setting" size="small" circle @click="openDrawer" />
  <img
    style="height: 24px; width: 24px; border-radius: 100%; margin: 0 8px 0 8px"
    :src="user.avatar"
  />
  <el-dropdown>
    <span
      class="el-dropdown-link"
      style="vertical-align: baseline; display: flex; align-items: center"
    >
      {{ user.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="quit">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 层级问题可以使用append-to-body -->
  <el-drawer v-model="drawer" :append-to-body="true" title="设置主题">
    <el-form label-position="left">
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color1" @change="changeTheme" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch v-model="isDark" @change="changeDark" />
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
