import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API
    // timeout: 5000
  });

  instance.interceptors.request.use(
    config => {
      // 如果此时有 token , 就给请求头加上
      const tokenStr = window.sessionStorage.getItem("token");
      config.headers.token = tokenStr;
      return config;
    },
    err => {
      console.log(err);
    }
  );

  return instance(config);
}
