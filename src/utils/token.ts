// 封装本地存取数据的方法
export const SET_TOKEN = (token: string) => {
  localStorage.setItem("token", token);
};
export const REMOVE_TOKEN = () => {
  localStorage.setItem("token", "");
};

export const GET_TOKEN = () => {
  return localStorage.getItem("token");
};
