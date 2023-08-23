// vue-router 的配置文件
import { createRouter, createWebHistory } from "vue-router";
import { constantRoutes } from "./routes";
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 路由跳转后滚动到顶部
  scrollBehavior: () => ({ top: 0, left: 0 }),
});
export default router;
