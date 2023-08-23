// 关于layout配置相关的事情
import { defineStore } from "pinia";
const useLayoutSettingStore = defineStore("SettingStore", {
  state: () => ({
    fold: false, // 是否折叠菜单
    refresh: false, // 是否刷新页面
  }),
  actions: {
    toggleFold() {
      this.fold = !this.fold;
    },
    toggleRefresh() {
      this.refresh = !this.refresh;
    },
  },
});
export default useLayoutSettingStore;
