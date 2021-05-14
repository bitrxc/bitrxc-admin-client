import axios from "axios";
import router from "@/router/index.js";

export function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
    // timeout: 5000
  });

  instance.interceptors.request.use(
    config => {
      // 如果此时有 token , 就给请求头加上
      const tokenStr = JSON.parse(window.localStorage.getItem("token")).token;
      config.headers.token = tokenStr;
      return config;
    },
    err => {
      console.log(err);
    }
  );

  instance.interceptors.response.use(result => {
    const res = result.data;
    // 401 代表登录过期
    if (res.code === 401) {
      router.push("/login");
    }
    return result;
  });

  return instance(config);
}
