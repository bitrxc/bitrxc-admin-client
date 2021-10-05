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
    <p>
      睿信社区管理后台的代码: <a href="https://github.com/Hyperzsb/bitrxc-admin-client">https://github.com/Hyperzsb/bitrxc-admin-client</a>
    </p>
    <p>
      睿信社区技术保障中心官网：<a href="https://bitrxc.com/">https://bitrxc.com/</a>
    </p>
    <p>
      目前和对接对接的问题有：
    </p>
    <ul>
      <li>没有管理员专属的获取时间信息的接口，希望接口提供数据的方式如下</li>
      <pre>
        <code>
{
  "code": 200,
  "message": "",
  "data": {
    "beginTimes": [
      { "id": 1, "time": "08:00:00" },
      { "id": 2, "time": "10:00:00" },
      { "id": 3, "time": "13:00:00" },
      { "id": 4, "time": "15:00:00" },
      { "id": 5, "time": "18:00:00" },
      { "id": 6, "time": "21:00:00" }
    ],
    "endTimes": [
      { "id": 1, "time": "10:00:00" },
      { "id": 2, "time": "12:00:00" },
      { "id": 3, "time": "15:00:00" },
      { "id": 4, "time": "18:00:00" },
      { "id": 5, "time": "21:00:00" },
      { "id": 6, "time": "22:00:00" }
    ]
  }
}
        </code>
      </pre>
      <li>管理员预约的部分，没有根据房间获取空闲时间的接口</li>
      <li>对于批量预约的接口，比如 /appointment/appoint， 后台并没有实现</li>
      <li>没有根据 id 获取单个管理员的接口</li>
      <li>我没有看懂修改管理员权限接口的表述</li>
    </ul>
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
