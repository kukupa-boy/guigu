<script setup lang="ts">
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>
<script lang="ts">
export default {
  name: "Tabbar",
};
</script>
<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb />
    </div>
    <div class="tabbar_right">
      <!-- right -->
      <setting />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  // jsutify-content: space-between;
  .tabbar_left {
    padding-left: 10px;
    display: flex;
    align-items: center;
    flex: 1;
  }
  .tabbar_right {
    display: flex;
    // flex:1;
    align-items: center;
    // jsutify-content: space-around;
    padding-right: 24px;
  }
}
</style>
