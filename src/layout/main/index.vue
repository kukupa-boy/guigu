<script setup lang="ts">
import { watch, ref, nextTick } from "vue";
import useSettingStore from "@/store/modules/setting";
let useSetting = useSettingStore();
let flag = ref(true);
watch(
  () => useSetting.refresh,
  (newVal) => {
    if (newVal) {
      // 重新刷新页面,思考如何在刷新后更新flag的状态
      flag.value = false;
      nextTick(() => {
        // dom更新完成，在nextTick中更新flag的状态
        flag.value = true;
      });
    }
  }
);
</script>
<script lang="ts">
export default {
  name: "MyMain",
};
</script>
<template>
  <div class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级组件的子路由 -->
        <component v-if="flag" :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
</style>
