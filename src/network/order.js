import { request } from "./index";

// 获取预约列表
export function getOrderList(correctCurrent, limit, value) {
  return request({
    url: `/appointment/${correctCurrent}/${limit}`,
    method: "get",
    params: {
      status: value
    }
  });
}

// 获取预约详细信息
export function getOrderDetail(orderId) {
  return request({
    url: `/appointment`,
    method: "get",
    params: {
      id: orderId
    }
  });
}

// 审核预约
export function checkOrder(orderId, data) {
  return request({
    url: `/appointment/check/${orderId}`,
    method: "put",
    params: data
  });
}
