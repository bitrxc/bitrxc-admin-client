<template>
  <div class="basic-layout">
    <div :class="['nav-side', unfold ? 'unfold' : '']">
      <ul :class="[unfold ? 'unfold' : '']">
        <!-- 在下方列表当中添加项，从而在左侧导航栏中显示该页面 -->
        <li @click="$router.push('/welcome')">欢迎页</li>
        <li @click="$router.push('/appointmentList')">订单列表</li>
        <li @click="$router.push('/appointmentManage')">订单管理</li>
        <li @click="$router.push('/orderRoomList')">活动室预约</li>
        <li @click="$router.push('/userList')">用户列表</li>
        <li @click="$router.push('/managerList')">管理员列表</li>
        <li @click="$router.push('/roomList')">房间列表</li>
      </ul>
    </div>
    <div :class="['main-page', unfold ? 'unfold' : '']">
      <div class="top-menu">
        <div class="left">
          <img :src="unfoldUrl" @click="unfold = !unfold" />
          <span>睿信社区管理系统后台</span>
        </div>
        <div class="right">
          <el-button size="small" @click="handleLogout">登出</el-button>
        </div>
      </div>
      <div class="wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
export default {
  name: 'Home',
  setup () {
    /** @type {{proxy:import("../main").LocalComponentInstance}} 访问 app 实例上挂载的各插件 */
    const { proxy } = getCurrentInstance()
    const unfoldUrl = ref(require('../assets/img/unfold.png'))
    const unfold = ref(true)

    const handleLogout = () => {
      proxy.$store.commit('clear')
      proxy.$router.replace('/login')
    }

    return {
      unfoldUrl,
      unfold,
      handleLogout
    }
  }
}
</script>

<style lang="less" scoped>
.basic-layout {
  .nav-side {
    cursor: pointer;
    position: fixed;
    height: 100%;
    width: 0;
    background-image: linear-gradient(rgb(76, 150, 185), rgb(167, 171, 172));
    transition: width .5s;
    &.unfold {
      width: 150px;
    }
    ul {
      display: none;
      &.unfold {
        display: block;
      }
      li {
        list-style-type: none;
        height: 50px;
        line-height: 50px;
        color: #fff;
        text-align: center;
      }
      li:hover {
        background-color: #eef0f3;
        color: #4e97b9;
      }
    }
  }
  .main-page {
    margin-left: 0;
    background-color: #eef0f3;
    transition: margin-left .5s;
    &.unfold {
      margin-left: 150px;
    }
    .top-menu {
      height: 40px;
      padding: 0 20px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
      display: flex;
      align-items: center;
        img {
          height: 30px;
          width: 30px;
          margin: 5px;
        }
        span {
          color: #4e97b9;
        }
      }
      .right {
        .el-button {
          color: #fff;
          background-color: #4e97b9;
        }
      }
    }
    .wrapper {
      min-height: calc(100vh - 80px);
      margin: 20px;
    }
  }
}
</style>
