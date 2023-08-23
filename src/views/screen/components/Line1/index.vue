<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
let charts = ref(null);
// 趋势图
let option = {
  // title: {
  //   text: "游客走势图",
  //   textStyle: {
  //     color: "#fff",
  //     fontSize: 20,
  //   },
  //   left: "center",
  // },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  // legend: {
  //   data: ["游客走势图"],
  //   textStyle: {
  //     color: "#fff",
  //   },
  //   top: 30,
  // },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: 80,
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      axisLabel: {
        color: "#fff",
      },
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        color: "#fff",
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
      axisTick: {
        show: true,
      },
    },
  ],
  series: [
    {
      name: "游客走势图",
      type: "line",
      stack: "总量",
      smooth: true,
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#29fcff", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#12144b", // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      data: [120, 132, 801, 134, 560, 230, 10],
    },
  ],
};
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  mycharts.setOption(option);
});
</script>

<template>
  <div class="box5">
    <div class="top">
      <p class="title">游客走势图</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
.box5 {
  // width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 10px;
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
    height: 200px;
    // background-color: #000;
  }
}
</style>
