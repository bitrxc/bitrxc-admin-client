<template>
  <div class="admin-appoint-container">
    <div class="select-rooms">
      <el-form>
        <el-form-item v-for="item in roomList" :key="item.id" :label="item.name">
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from '@vue/runtime-core'
// import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

export default {
  setup () {
    const { proxy } = getCurrentInstance()

    const roomList = proxy.$store.getters.roomList

    console.log(roomList)

    return {
      roomList
    }
  }
}
</script>

<style lang="less" scoped>
.admin-appoint-container {
  height: 100%;
  max-width: 900px;
  .select-rooms {
    background-color: #fff;
    padding: 20px;
  }
}
</style>
