import { ElMessage } from "element-plus";

// 希望穿过来的参数为字符串
export function reqSuccess(msg) {
  return ElMessage({
    type: "success",
    message: msg,
    center: true
  });
}

export function reqError(msg) {
  return ElMessage({
    type: "error",
    message: msg,
    center: true
  });
}
