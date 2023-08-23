<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import * as china from "./china.json";
let map = ref(null);
// 注册中国地图
echarts.registerMap("china", china as any);
// option配置
let option = {
  geo: {
    map: "china",
    roam: true,
    zoom: 1.2,
    left: 200,
    top: 150,
    right: 150,
    bottom: 0,
    label: {
      show: true,
      color: "#fff",
      fontSize: 12,
    },
    itemStyle: {
      areaColor: {
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
      opacity: 0.8,
      borderColor: "#0a3264",
      shadowColor: "#0a3264",
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
    },
    emphasis: {
      label: {
        show: true,
        color: "#f9d849",
        fontSize: 18,
      },
      itemStyle: {
        areaColor: "cyan",
        borderColor: "#0a3264",
        shadowColor: "#0a3264",
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
    },
  },
  series: [
    {
      type: "lines",
      data: [
        {
          coords: [
            [116.405285, 39.904989], // 起点
            [104.065735, 30.659462], // 终点
          ],
          // 统一的样式设置
          lineStyle: {
            color: "cyan",
            width: 3,
            type: "solid",
          },
        },
      ],
      effect: {
        show: true,
        symbol: "arrow",
        symbolSize: 10,
        trailLength: 0,
        loop: true,
      },
    },
  ],
};
onMounted(() => {
  const myChart = echarts.init(map.value);
  myChart.setOption(option);
});
</script>

<template>
  <div class="box" ref="map"></div>
</template>

<style scoped lang="scss"></style>
