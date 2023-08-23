import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd()); // 获取环境变量
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 配置路劲在src/icons下的所有svg文件
        iconDirs: [Path.resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]", // icon-文件夹-文件名
      }),
      viteMockServe({
        localEnabled: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": Path.resolve(__dirname, "/src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/style/variables.scss";`,
          javascriptEnabled: true,
        },
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVER_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
