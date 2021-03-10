import axios from "axios";

// 配置请求的根路径
// axios.defaults.baseURL = "https://test.ruixincommunity.cn/admin/";

// 配置请求拦截器
axios.interceptors.request.use(config => {
  // 为请求头对象， 添加 Token 验证的 Authorization 字段
  const tokenStr = window.sessionStorage.getItem("token");
  if (tokenStr) {
    config.headers.Authorization = tokenStr;
  }
  return config;
});

export default axios;
