import SvgIcon from "@/components/SvgIcon/index.vue";
import Category from "@/components/Category/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
export default {
  install(app: any) {
    app.component("SvgIcon", SvgIcon);
    app.component("Category", Category);
    // 将element-plus的图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
