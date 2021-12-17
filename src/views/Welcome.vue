<template>
  <div class="welcome">
    <h1>欢迎访问睿信社区管理系统后台</h1>
    <p>
      BIT 睿信书院社区管理系统简称 BITRXC, 是由睿信社区技术保障中心开发的综合后台管理系统
    </p>
    <p>目前 BITRXC 的功能包括: </p>
    <ul>
      <li>订单列表 —— 审批由微信小程序发起的预约</li>
      <li>管理员列表 —— 管理不同的管理员</li>
      <li>活动室预约 —— 管理员批量预约活动室</li>
      <li>房间列表 —— 修改房间信息</li>
    </ul>
    <figure>
      <img src="../../public/feedbackQrcode.png" />
      <figcaption>
        <a href="https://shimo.im/forms/VMAPVQEQBnIRE0qg/fill?channel=frontpage">反馈问题</a>
      </figcaption>
    </figure>
    <p>
      睿信社区管理后台的代码: <a href="https://github.com/Hyperzsb/bitrxc-admin-client">https://github.com/Hyperzsb/bitrxc-admin-client</a>
    </p>
    <p>
      睿信社区技术保障中心官网：<a href="https://bitrxc.com/">https://bitrxc.com/</a>
    </p>
  </div>
</template>

<style lang="less" scoped>
.welcome {
  background-color: #fff;
  padding: 20px;
  line-height: 1.5;
  h1 {
    color: #4e97b9;
  }
  p {
    margin: 20px 0;
    color: #777;
    a {
      color: #0969da;
      text-decoration: none;
    }
  }
  ul {
    margin: 20px;
    color: #777;
  }
  pre {
    padding: 0;
    margin: 0;
    background-color: #eee;
  }
}
</style>
