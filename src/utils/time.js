/**
 * 后端传递过来的 launchTime(预约执行时间段) 是一个 id,
 * 需要前端按照一定规则解析为相应的时间
 * @param {Number} id
 * @returns
 */
export function correctLaunchTime(id) {
  let res = null;
  switch (id) {
    case 1:
      res = "07:00:00-08:00:00";
      break;
    case 2:
      res = "08:00:00-09:00:00";
      break;
    case 3:
      res = "09:00:00-10:00:00";
      break;
    case 4:
      res = "13:00:00-14:00:00";
      break;
    case 5:
      res = "14:00:00-15:00:00";
      break;
    case 6:
      res = "21:00:00-22:00:00";
      break;
    default:
      res = "error";
  }
  return res;
}

/**
 * 后端传递过来的 launchDate(预约发起时间)是一个时间戳,
 * 需要前端转换为真实时间
 * @param {Number} launchDate
 * @returns
 */
export function correctLaunchDate(launchDate) {
  const date = new Date(launchDate);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
}
