import pinia from "@/store";
import useUserStore from "@/store/modules/user.ts";
const userStore = useUserStore(pinia);
export const isHasButton = (app) => {
  app.directive("has", {
    mounted(el, binding) {
      if (userStore.buttons.includes(binding.value)) {
        return;
      } else {
        el.parentNode.removeChild(el);
      }
    },
  });
};
