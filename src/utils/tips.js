import { ElMessage } from "element-plus";

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

export function reqInfo(msg) {
  return ElMessage({
    message: msg,
    center: true
  });
}
