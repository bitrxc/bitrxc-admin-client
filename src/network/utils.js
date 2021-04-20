import { request } from "../network/index.js";

export async function getScheduleArray() {
  return request({
    url: "/schedule/all",
    methods: "get"
  });
}
