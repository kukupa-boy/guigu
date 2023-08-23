<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let charts = ref(null);
// 容器放置多个图形图表
let options = {
  title: {
    text: "热门景区排行",
    left: "60%",
    textStyle: {
      color: "#29fcff",
    },
    subtext: "各大景区",
    subtextStyle: {
      fontSize: 15,
      align: "bottom",
      color: "#f4ba40",
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {},
  grid: {
    top: "20%",
    left: "10%",
    bottom: "8%",
    right: "10%",
  },
  series: [
    {
      type: "bar",
      data: [203, 205, 405, 689, 340],
      label: {
        show: true,
        position: "top",
        color: "blue",
      },
      showBackground: true,
      backgroundStyle: {
        color: "transparent",
      },
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: function (data: any) {
          // 给每个柱状设置颜色
          let arr = ["#19CAAD", "#8CC7B5", "#A0EEE1", "#BEE7E9", "#BEEDC7"];
          return arr[data.dataIndex];
        },
      },
    },
  ],
};
onMounted(() => {
  // 获取echarts实例
  let mycharts = echarts.init(charts.value);

  mycharts.setOption(options);
});
</script>

<template>
  <div class="box">
    <div class="top">
      <p class="title">景区排行统计</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
.box {
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    .title {
      margin-top: 15px;
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
    height: 360px;
    // background-color: red;
  }
}
</style>
