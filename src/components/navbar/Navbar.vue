<template>
  <div class="navbar">
    <span>睿信社区管理系统后台</span>
    <a-button type="primary" @click="logout">退出登录</a-button>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.replace("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 100%;
  display: -webkit-flex;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.navbar span {
  margin: 0 10px;
}
</style>
