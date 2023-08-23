<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let charts = ref(null);
const options = {
  title: "",
  xAxis: {
    show: false,
    min: 0,
    max: 100,
  },
  yAxis: {
    show: false,
    type: "category",
  },
  series: [
    {
      type: "bar",
      data: [58],
      barWidth: 20,
      z: 100,
      radius: "50%",
      itemStyle: {
        color: "#3479f5",
        borderRadius: 20,
      },
    },
    {
      type: "bar",
      data: [100],
      barWidth: 20,
      barGap: "-100%",
      itemStyle: {
        color: "#ec5a7b",
        borderRadius: 20,
      },
    },
  ],
  grid: {
    left: 60,
    bottom: 0,
    top: 0,
    right: 60,
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
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" />
      </div>
      <div class="woman">
        <img src="../../images/woman.png" />
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div ref="charts" class="charts"></div>
  </div>
</template>

<style scoped lang="scss">
.box {
  background: url("../../images/dataScreen-main-cb.png") no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
  .top {
    margin-left: 20px;
    margin-top: -10px;
    .title {
      margin-top: 8px;
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
  .sex {
    display: flex;
    justify-content: center;
    margin-left: 20px;
    margin-top: -10px;
    .man {
      margin: 20px;
      width: 110px;
      height: 115px;
      background: url("../../images/man-bg.png") no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .woman {
      margin: 20px;
      width: 110px;
      height: 115px;
      background: url("../../images/woman-bg.png") no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .rate {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    p:nth-of-type(2) {
      margin-left: 150px;
    }
    p {
      color: white;
      font-size: 14px;
    }
  }
  .charts {
    height: 100px;
    // background:red;
    width: 100%;
  }
}
</style>
