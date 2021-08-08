import { request } from "./index";

export function login(loginForm) {
  return request({
    url: "/login",
    method: "post",
    data: loginForm
  });
}
