<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let charts = ref(null);
let options = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "32%",
    right: 70,
    orient: "vertical",
    textStyle: {
      color: "#fff",
      fontSize: 16,
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["30%", "70%"],
      avoidLabelOverlap: false,
      right: 120,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: true,
        position: "inside",
        color: "#fff",
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "10-20" },
        { value: 735, name: "20-40" },
        { value: 580, name: "40-60" },
        { value: 484, name: "60-80" },
      ],
    },
  ],
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};
onMounted(() => {
  let mycharts = echarts.init(charts.value);

  mycharts.setOption(options);
});
</script>

<template>
  <div class="box">
    <div class="top">
      <p class="title">年龄比例</p>
      <p class="bg"></p>
      <!-- <p class="right">可预约总量<span>9999999</span>人</p> -->
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
.box {
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 6px;
  .top {
    margin-left: 20px;
    .title {
      margin-top: 0px;
      color: white;
      font-size: 20px;
    }
    .bg {
      margin-top: 12px;
      width: 68px;
      height: 7px;
      background: url("../../images/dataScreen-title.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .charts {
    width: 100%;
    height: 250px;
    // background: red;
    margin-top: 10px;
  }
}
</style>
