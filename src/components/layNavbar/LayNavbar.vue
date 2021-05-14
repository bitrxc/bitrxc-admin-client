<template>
  <div class="lay-navbar">
    <!-- 折叠按钮 -->
    <div class="toggle-button" @click="toggleSidebar">
      <i class="el-icon-s-operation"></i>
      <span>睿信管理后台</span>
    </div>
    <el-button type="info" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: "LayNavbar",
  data() {
    return {
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
      this.emitter.emit("toggle-sidebar", this.isSidebarOpen);
    },
    logout() {
      window.localStorage.clear();
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.lay-navbar {
  height: 100%;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .toggle-button {
    .el-icon-s-operation {
      font-size: 35px;
      color: #999;
      padding-right: 10px;
    }
  }
}
</style>
