<template>
  <div class="home">
    <aside>
      <sider></sider>
    </aside>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Sider from "@/components/sider/Sider.vue";
export default {
  components: {
    Sider
  }
};
</script>

<style scoped>
.home {
  display: flex;
  min-height: 100vh;
}
.home aside {
  width: 200px;
  padding: 64px 0;
  background: url("../assets/img/background.png") repeat;
}
@media screen and (max-width: 992px) {
  .home aside {
    display: none;
  }
}
.home main {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.home main header {
  height: 64px;
  padding: 0 60px;
  border-bottom: 2px solid #ccc;
}
</style>
