// 解决引用vue文件时ts报错的问题
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    unknown
  >;
  export default component;
}
