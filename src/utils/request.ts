import axios from "axios";
import { ElMessage } from "element-plus";
// 封装请求和响应拦截器
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 发送请求前添加token头部
    if (localStorage.getItem("token") !== null) {
      config.headers.token = localStorage.getItem("token");
    }
    // 在发送请求之前做些什么
    return config; // config 为请求的配置项,需要返回
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    let message = error.message;
    const status = error.response?.status;
    switch (status) {
      case 400:
        message = "请求错误";
        break;
      case 401:
        message = "未授权，请登录";
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = `请求地址出错: ${error.response.config.url}`;
        break;
      case 408:
        message = "请求超时";
        break;
      case 500:
        message = "服务器内部错误";
        break;
      case 501:
        message = "服务未实现";
        break;
      case 502:
        message = "网关错误";
        break;
      case 503:
        message = "服务不可用";
        break;
      case 504:
        message = "网关超时";
        break;
      case 505:
        message = "HTTP版本不受支持";
        break;
      default:
        message = "未知错误";
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
);
export default instance;
