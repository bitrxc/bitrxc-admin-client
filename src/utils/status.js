/**
 * 后端传入 new, status 等英文属性
 * 需要前端处理为中文
 * @param {String} status
 * @returns
 */
export function correctStatus(status) {
  let res = null;
  switch (status) {
    case "new":
      res = "待审核";
      break;
    case "receive":
      res = "已批准";
      break;
    case "signed":
      res = "已签到";
      break;
    case "illegal":
      res = "未签退";
      break;
    case "finished":
      res = "已签退";
      break;
    case "missed":
      res = "爽约";
      break;
    case "reject":
      res = "已驳回";
      break;
    case "cancel":
      res = "用户撤回";
      break;
    default:
      res = "This is a error";
      break;
  }
  return res;
}
