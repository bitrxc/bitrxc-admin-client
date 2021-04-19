<template>
  <div class="lay-sidebar">
    <el-menu
      background-color="#333"
      text-color="#fff"
      active-text-color=""
      :collapse="isSidebarOpen"
      :collapse-transition="false"
      router
    >
      <el-menu-item index="/orderList" id="first-menu-item">
        <i class="el-icon-alarm-clock"></i>
        <span>预约管理</span>
      </el-menu-item>
      <el-menu-item index="/notFound">
        <i class="el-icon-house"></i>
        <span>房间管理</span>
      </el-menu-item>
      <el-menu-item index="/notFound">
        <i class="el-icon-user"></i>
        <span>用户管理</span>
      </el-menu-item>
      <el-menu-item index="/notFound">
        <i class="el-icon-view"></i>
        <span>新闻管理</span>
      </el-menu-item>
      <el-menu-item index="/notFound">
        <i class="el-icon-pie-chart"></i>
        <span>数据统计</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "LaySidebar",
  data() {
    return {
      isSidebarOpen: false
    };
  },
  mounted() {
    this.emitter.on("toggle-sidebar", isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
};
</script>

<style scoped>
.class-sidebar {
  position: fixed;
}
#first-menu-item {
  margin-top: 65px;
}
.el-menu {
  border: none;
}
</style>
