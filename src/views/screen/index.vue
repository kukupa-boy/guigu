<script setup lang="ts">
import { ref, onMounted } from "vue";
import Top from "./components/Top/index.vue";
import Age from "./components/Age/index.vue";
import Tourist from "./components/Tourist/index.vue";
import Gender from "./components/Gender1/index.vue";
import Map from "./components/Map/index.vue";
import Line from "./components/Line1/index.vue";
import Rank from "./components/Rank/index.vue";
import Year from "./components/Year/index.vue";
import Counter from "./components/Counter/index.vue";
// 数据大屏展示的dom元素
let screen = ref(null);
// 大屏缩放的比例
const getScale = (h = 1080, w = 1920) => {
  const vh = window.innerHeight / h;
  const vw = window.innerWidth / w;
  return vh > vw ? vw : vh;
};
onMounted(() => {
  console.log(getScale());
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});
window.onresize = () => {
  console.log(getScale());
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
</script>

<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="b_left">
          <Tourist class="tourist"></Tourist>
          <Gender class="gender"></Gender>
          <Age class="age"></Age>
        </div>
        <div class="b_center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="b_right">
          <Rank class="rank" />
          <Year class="year" />
          <Counter class="counter" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;
}
.screen {
  width: 1920px;
  height: 1080px;
  // background-color: red;
  position: fixed;
  left: 50%;
  top: 50%;
  transform-origin: top left;
  .top {
    width: 100%;
    height: 40px;
    // background-color: aquamarine;
  }
  .bottom {
    display: flex;
    .b_left {
      flex: 1;
      height: 1040px;
      display: flex;
      flex-direction: column;
      .age {
        flex: 1;
        // background-color: aliceblue;
      }
      .tourist {
        flex: 1.5;
      }
      .gender {
        flex: 1;
        // background-color: aquamarine;
      }
    }
    .b_center {
      flex: 2;
      display: flex;
      flex-direction: column;
      // background-color: antiquewhite;
      .map {
        flex: 3;
        // background-color: aquamarine;
      }
      .line {
        flex: 1;
        // background-color: aliceblue;
      }
    }
    .b_right {
      flex: 1;
      // background-color: black;
      display: flex;
      flex-direction: column;
      .counter {
        flex: 1;
      }
      .year {
        flex: 1;
      }
      .rank {
        flex: 1.5;
      }
    }
  }
}
</style>
