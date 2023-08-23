<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import moment from "moment";
let router = useRouter();
let time = ref(moment().format("YYYY-MM-DD:hh-mm-ss"));
let timer = ref(null);
// 跳转回首页
const goHome = () => {
  router.push({ path: "/home" });
};
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format("YYYY-MM-DD:hh-mm-ss");
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
}
.left {
  flex: 1;
  background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
  background-size: cover;
  .lbtn {
    width: 150px;
    height: 40px;
    float: right;
    text-align: center;
    line-height: 40px;
    color: #29fcff;
    font-size: 20px;
    background: url("../../images/dataScreen-header-btn-bg-l.png") no-repeat;
    background-size: 100% 100%;
  }
}
.center {
  flex: 2;
  .title {
    width: 100%;
    height: 74px;
    background: url("../../images/dataScreen-header-center-bg.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 74px;
    color: #29fcff;
    font-size: 30px;
  }
}
.right {
  flex: 1;
  background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  .rbtn {
    width: 150px;
    height: 40px;
    float: left;
    background: url("../../images/dataScreen-header-btn-bg-r.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 40px;
    color: #29fcff;
    font-size: 20px;
  }
  .time {
    text-align: center;
    line-height: 40px;
    color: #29fcff;
    font-size: 20px;
    margin-right: 10px;
  }
}
</style>
