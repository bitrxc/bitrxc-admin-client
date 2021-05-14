import axios from "axios";
import router from "@/router/index.js";

export function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
  });

  instance.interceptors.request.use(
    config => {
      const tokenObj = JSON.parse(window.localStorage.getItem("token"));
      // 如果有 token 则加上
      if (tokenObj) {
        config.headers.token = tokenObj.token;
      }
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
