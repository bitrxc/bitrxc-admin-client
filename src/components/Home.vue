<template>
  <div class="basic-layout">
    <div :class="['nav-side', unfold ? 'unfold' : '']">
      <ul :class="[unfold ? 'unfold' : '']">
        <li @click="$router.push('/appointmentList')">订单列表</li>
        <li @click="$router.push('/managerList')">管理员列表</li>
      </ul>
    </div>
    <div :class="['main-page', unfold ? 'unfold' : '']">
      <div class="top-menu">
        <div class="left">
          <img :src="unfoldUrl" @click="unfold = !unfold" />
          <span>睿信社区管理系统后台</span>
        </div>
        <div class="right">
          <el-button size="small">登出</el-button>
        </div>
      </div>
      <div class="wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Home',
  setup () {
    const unfoldUrl = ref(require('../assets/img/unfold.png'))
    const unfold = ref(false)

    return {
      unfoldUrl,
      unfold
    }
  }
}
</script>

<style lang="less" scoped>
.basic-layout {
  height: 100vh;
  .nav-side {
    cursor: pointer;
    position: fixed;
    height: 100%;
    width: 0;
    background-image: linear-gradient(rgb(76, 150, 185), rgb(167, 171, 172));
    transition: width .5s;
    &.unfold {
      width: 100px;
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
    height: 100%;
    margin-left: 0;
    background-color: #eef0f3;
    transition: margin-left .5s;
    &.unfold {
      margin-left: 100px;
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
      height: calc(100vh - 100px);
      margin: 20px;
    }
  }
}
</style>
