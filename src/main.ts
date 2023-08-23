import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/theme-chalk/dark/css-vars.css";
import GlobalComponents from "@/components/index.ts";

// svg文件的配置代码
import "virtual:svg-icons-register";

import App from "./App.vue";
import "@/style/index.scss";
import router from "@/router/index.ts";
import pinia from "@/store/index.ts";
import { isHasButton } from "@/directives/has.ts";
import "@/router/permission.ts";
const app = createApp(App);
app.use(isHasButton);
app.use(router);
app.use(GlobalComponents);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(pinia);

app.mount("#app");
