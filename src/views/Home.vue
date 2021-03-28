<template>
  <div class="home">
    <!-- 侧边栏 -->
    <el-container class="home-container">
      <el-aside
        class="home-aside"
        :width="isCollapse ? '64px !important' : '250px !important'"
      >
        <!-- 侧边栏的图片 -->
        <div class="icon">
          <img
            :style="isCollapse ? 'width: 55px' : 'width: 145px'"
            src="@/assets/img/administration.svg"
          />
        </div>

        <!-- 折叠按钮 -->
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>

        <!-- 侧边栏选择项 -->
        <lay-side-bar></lay-side-bar>
      </el-aside>

      <el-container>
        <!-- 头部 -->
        <el-header class="home-header">
          <div class="left-panel">
            <span>睿信</span>
          </div>
          <div class="right-panel">
            <router-link to="/personalDetails">
              <img class="avatar-img" src="@/assets/img/avatar.svg" />
            </router-link>
            <span class="avatar-name" for="avatar-img">admin</span>
            <el-button @click="logout">退出</el-button>
          </div>
        </el-header>
        <!-- 主要区域 -->
        <el-main class="home-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LaySideBar from "@/components/laySideBar/LaySideBar.vue";

export default {
  components: { LaySideBar },
  name: "Home",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    // 折叠侧边栏按钮
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 退出
    logout() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  height: 100vh;
  background-color: #fcfcfc;

  .home-aside {
    background-color: rgba(36, 41, 46, 1);

    .icon {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        margin: 10px 0;
      }
    }

    .toggle-button {
      height: 40px;
      color: #fff;

      /* 水平和垂直居中 */
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;

      background-color: #0dbc79;
      letter-spacing: 0.3rem;
    }
  }

  .home-header {
    background-color: rgba(36, 41, 46, 1);
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center; /* 居中对齐弹性盒的所有 div 元素 */
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 5px rgba(246, 248, 249, 1);
    color: #fff;

    .right-panel {
      display: flex;
      align-items: center;

      .avatar-img {
        width: 58px;
        border: 1px solid #fff;
        border-radius: 50%;
      }

      .avatar-name {
        margin: 0 10px;
      }
    }
  }
}
</style>
