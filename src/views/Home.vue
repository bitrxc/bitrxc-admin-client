<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <lay-sidebar></lay-sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <lay-navbar></lay-navbar>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LaySidebar from "@/components/laySidebar/LaySidebar.vue";
import LayNavbar from "@/components/layNavbar/LayNavbar.vue";
export default {
  components: {
    LaySidebar,
    LayNavbar
  },
  name: "Home"
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}
.el-aside {
  background: #333;
}
.el-header {
  padding: 5px;
  border: 1px solid #ccc;
}
.el-main {
  padding: 5px;
}
</style>
