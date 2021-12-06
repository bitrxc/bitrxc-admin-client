<template>
<div class="order-room-list">
  <div class="tip">点击图片即可你进入想要预约的房间</div>
  <div class="container">
    <div class="item" v-for="item in roomList" :key="item.id" @click="handleRoomClick(item.id)">
      <span>{{ item.name }}</span>
      <el-image :src="item.image">
        <template #error>
          <div class="err-img">图片加载失败</div>
        </template>
      </el-image>
    </div>
    <i></i><i></i><i></i><i></i>
  </div>
</div>
</template>

<script>
export default {
  /** @this {import("../../main").LocalComponentInstance} 访问 app 实例上挂载的各插件 */
  data () {
    return {
      roomList: this.$store.getters.roomList
    }
  },
  methods: {
    /** @this {import("../../main").LocalComponentInstance} 访问 app 实例上挂载的各插件 */
    handleRoomClick (id) {
      const newWindowPath = this.$router.resolve({
        path: `/orderRoomItem/${id}`
      })
      window.open(newWindowPath.href, '_target')
    }
  }
}
</script>

<style lang="less" scoped>
.order-room-list {
  background-color: #fff;
  max-width: 900px;
  padding: 20px;
  .tip {
    color: #4e97b9;
    font-weight: bold;
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .item {
      width: 150px;
      margin: 0 20px;
      cursor: pointer;
      span {
        display: block;
        margin: 10px 0;
      }
      .el-image {
        .err-img {
          width: 150px;
          height: 102px;
          line-height: 102px;
          color: #fff;
          text-align: center;
          background-image: linear-gradient(rgb(76, 150, 185), rgb(167, 171, 172));
        }
      }
    }
    i {
      width: 150px;
      margin: 0 20px;
    }
  }
}
</style>
