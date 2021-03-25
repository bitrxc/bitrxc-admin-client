import { request } from "./index";

// 获取房间详情列表
export function getRoomList(correctCurrent, limit) {
  return request({
    url: `/room/${correctCurrent}/${limit}`,
    method: "get"
  });
}

// 添加房间
export function addRoomItem(data) {
  return request({
    url: `/room`,
    method: "post",
    data: data
  });
}

// 删除房间
export function deleteRoomItem(roomId) {
  return request({
    url: `/room/${roomId}`,
    method: "delete"
  });
}

// 搜索房间
export function searchRooms(nameLike) {
  return request({
    url: `/room/nameLike`,
    method: "get",
    params: {
      nameLike: nameLike
    }
  });
}
