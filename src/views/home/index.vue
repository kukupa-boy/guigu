<script setup lang="ts">
import user from "@/store/modules/user";
import type { userState } from "@/store/modules/types/types.ts";
import setting from "@/setting";
let store: userState = user();
// 判断当前时间是否为上午下午晚上
const getNowFormatDate = () => {
  const date = new Date();
  const seperator1 = "-";
  const seperator2 = ":";
  const month = date.getMonth() + 1;
  const strDate = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    hour +
    seperator2 +
    minutes +
    seperator2 +
    seconds;
  const time = currentdate.split(" ")[1];
  const timeArr = time.split(":");
  const hourTime = parseInt(timeArr[0]);
  if (hourTime >= 0 && hourTime <= 11) {
    return "上午好";
  } else if (hourTime > 11 && hourTime <= 13) {
    return "中午好";
  } else if (hourTime > 13 && hourTime <= 18) {
    return "下午好";
  } else if (hourTime > 18 && hourTime <= 24) {
    return "晚上好";
  }
};
</script>

<template>
  <div class="outer">
    <el-card>
      <div style="display: flex; align-items: center">
        <img
          :src="store.avatar"
          style="width: 150px; height: 150px; border-radius: 50%"
        />
        <div style="padding-left: 16px">
          <div style="font-size: 24px; font-weight: bold">
            {{ getNowFormatDate() + store.username }}
          </div>
          <div style="color: gray; font-style: italic; margin-top: 30px">
            {{ setting.title }}
          </div>
        </div>
      </div>
    </el-card>
    <div>
      <div class="bg"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.outer {
  height: calc(100vh - #{$base_tabbar_height} - 32px);
}
.bg {
  margin: 80px auto;
  width: 500px;
  height: 300px;
  background: url("../../assets/icons/welcome.svg") no-repeat center center;
  background-size: cover;
  z-index: -1;
}
</style>
