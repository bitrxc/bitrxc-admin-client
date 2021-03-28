import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "https://test.ruixincommunity.cn/admin",
    timeout: 5000
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

  instance.interceptors.response.use(
    result => {
      // 每次请求均更新 token
      window.sessionStorage.setItem("token", result.data.data.token);
      return result;
    },
    err => {
      console.log(err);
    }
  );
  return instance(config);
}
