<script setup lang="ts">
// 引入logo组件
import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import useUserStore from "@/store/modules/user";
import Main from "@/layout/main/index.vue";
import { useRoute } from "vue-router";
import Tabbar from "@/layout/tabbar/index.vue";
import useLayoutSettingStore from "@/store/modules/setting";
// import { onMounted } from "vue";
const layoutSettingStore = useLayoutSettingStore();
const userStore = useUserStore();
let route = useRoute();
// onMounted(() => {
//   // 获取用户信息
//   userStore.getUserInfo();
// });
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<template>
  <div class="layout_container">
    <!-- ：class重新覆盖，而不是class三元，三元有问题  -->
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold }">
      <Logo />
      <el-scrollbar class="scrollbar">
        <!-- 根据路径默认激活菜单，展开菜单 -->
        <el-menu
          :default-active="route.path"
          background-color="#051521"
          text-color="white"
          :collapse="layoutSettingStore.fold"
        >
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_tabbar" :class="{ fold: layoutSettingStore.fold }">
      <Tabbar />
    </div>
    <div class="layout_main" :class="{ fold: layoutSettingStore.fold }">
      <Main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  // background-color: cyan;
  .layout_slider {
    width: $base_menu_width;
    height: 100vh;
    background-color: $base_menu_bg;
    color: white;
    transition: all 0.5s;
    &.fold {
      width: $base_menu_width_mini;
    }
    .scrollbar {
      height: calc(100vh - #{$base_menu_logo_height});
      .el-menu {
        border: 0px;
      }
    }
  }

  .layout_tabbar {
    width: calc(100% - #{$base_menu_width});
    height: $base_tabbar_height;
    position: fixed;
    top: 0;
    left: $base_menu_width;
    transition: all 0.5s;
    &.fold {
      width: calc(100% - #{$base_menu_width_mini});
      left: $base_menu_width_mini;
    }
  }
  .layout_main {
    width: calc(100% - #{$base_menu_width});
    height: calc(100vh - #{$base_tabbar_height});
    // background-color: $base_main_bg;
    position: absolute;
    top: $base_tabbar_height;
    left: $base_menu_width;
    padding: 16px;
    overflow: auto;
    transition: all 0.5s;
    &.fold {
      width: calc(100% - #{$base_menu_width_mini});
      left: $base_menu_width_mini;
    }
  }
}
</style>
