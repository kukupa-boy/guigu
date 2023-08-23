<script setup lang="ts">
import setting from "@/setting.ts";
</script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>
<template>
  <div class="logo">
    <img v-if="setting.logoHidden" :src="setting.logo" />
    <span>{{ setting.title }}</span>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: $base_menu_logo_height;
  display: flex;
  align-items: center;
  overflow: hidden;
  // justify-content: space-around;
  padding-left: 15px;
  img {
    height: 36px;
    width: 36px;
  }
  span {
    padding-left: 20px;
    color: #fff;
    font-size: $base_menu_logo_font_size;
  }
}
</style>
