<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import "echarts-liquidfill";
let people = ref("210908人");
let charts = ref(null);
// 设置实例的配置项,配置水球图
let options = {
  title: {
    text: "",
    textStyle: {
      //设置主标题的文字风格
      color: "white", //字体颜色
      fontSize: 24, //文字大小
    },
  },
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  series: [
    {
      type: "liquidFill",
      data: [0.6],
      color: ["#29fcff"],
      radius: "100%",
      outline: {
        show: false,
      },
      backgroundStyle: {
        borderColor: "cyan",
        borderWidth: 1,
        shadowColor: "rgba(0, 0, 0, 0.4)",
        shadowBlur: 20,
      },
      shape:
        "path://M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z",
      label: {
        position: ["38%", "40%"],
        formatter: function () {
          return "预测量";
        },
        fontSize: 20,
        color: "#29fcff",
      },
    },
  ],
};
onMounted(() => {
  // 获取echarts实例
  let mycharts = echarts.init(charts.value);
  console.log("mycharts", mycharts);

  mycharts.setOption(options);
});
</script>

<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>9999999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div class="charts" ref="charts">123</div>
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
    .right {
      float: right;
      color: white;
      font-size: 20px;
      padding-right: 8px;
      span {
        color: #ffd700;
        font-size: 14px;
        padding: 0 4px;
      }
    }
  }
  .number {
    margin-top: 30px;
    // background: red;
    display: flex;
    padding: 10px;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url("../../images/total.png") no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 24px;
    }
  }
  .charts {
    width: 100%;
    height: 240px;
    // background-color: red;
  }
}
</style>
