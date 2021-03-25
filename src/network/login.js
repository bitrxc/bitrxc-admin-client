import { request } from "./index";

// 登录函数
export function loginRequest(loginForm) {
  return request({
    url: "login",
    method: "post",
    data: loginForm
  });
}
