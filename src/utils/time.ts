// 获取当前的时间为上午还是下午
export const getNowTime = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour < 12 && hour > 6) {
    return "上午好";
  } else if (hour < 18) {
    return "下午好";
  } else {
    return "晚上好";
  }
};
