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

/**
 * 后端传入状态, 有一些状态不能修改为其他字段
 * @param {String} status
 * @returns 
 */
export function getOptions(status) {
  let options = [];
  switch(status) {
    case "new":
      options = [
        { value: "receive", label: "已批准" },
        { value: "reject", label: "已驳回" }
      ];
      break;
    case "receive":
      options = [
        { value: "signed", label: "已签到" },
        { value: "missed", label: "爽约" }
      ];
      break;
    case "signed":
      options = [
        { value: "illegal", label: "未签退" },
        { value: "finished", label: "已签退" }
      ];
      break;
    case "illegal":
      options = [{ value: "finished", label: "已签退" }];
      break;
    case "missed":
      options = [{ value: "signed", label: "已签到" }];
      break;
    default:
      // 剩下的已签退(finished)、管理员驳回(reject)、用户撤回(cancel) 这三种状态不能够再修改
      options = [{ value: null, label: "无法修改", disabled: true }]
  }
  return options;
}
