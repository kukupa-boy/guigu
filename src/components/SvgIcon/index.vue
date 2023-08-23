<script setup lang="ts">
let props = defineProps({
  name: {
    type: String,
    default: "",
  },
  prefix: {
    type: String,
    default: "#icon-",
  },
  color: {
    type: String,
    default: "pink",
  },
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
</script>

<template>
  <div>
    <svg>
      <use
        :xlink:href="props.prefix + props.name"
        :fill="props.color"
        :width="props.width"
        :height="props.height"
      ></use>
    </svg>
  </div>
</template>

<style scoped></style>
