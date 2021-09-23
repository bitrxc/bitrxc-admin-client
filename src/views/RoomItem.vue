<template>
  <div class="room-item-container">
    <div class="description">
      <el-descriptions title="房间详情" border size="small" :column="1">
        <el-descriptions-item :label="labels.name">{{ roomItem.name }}</el-descriptions-item>
        <el-descriptions-item :label="labels.description">{{ roomItem.description }}</el-descriptions-item>
        <el-descriptions-item :label="labels.name">
          <el-image style="height: 250px" :src="roomItem.images"></el-image>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="operation-menu">
      <el-button @click="roomItemVisible = true">修改</el-button>
    </div>
    <el-dialog title="修改房间信息" v-model="roomItemVisible">
      <el-form :model="roomItem">
        <el-form-item label="名字">
          <el-input v-model="roomItem.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="roomItem.description" />
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="roomItem.images" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="roomItemVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRoomUpdate">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'

export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const roomItem = ref({})
    const roomItemVisible = ref(false)

    const labels = ref({
      id: '房间编号',
      name: '名字',
      images: '图片',
      description: '描述'
    })

    onMounted(() => {
      getRoomItem()
    })

    const getRoomItem = async () => {
      const { roomInfo } = await proxy.$api.roomItem({ id: proxy.$route.params.id })
      roomItem.value = roomInfo
    }

    const handleRoomUpdate = async () => {

    }

    return {
      labels,
      roomItem,
      roomItemVisible,
      handleRoomUpdate
    }
  }
}
</script>

<style lang="less" scoped>
.room-item-container {
  height: 100%;
  max-width: 900px;
  .description {
    padding: 20px;
    background-color: #fff;
  }
  .operation-menu {
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    text-align: right;
    .el-button {
      background-color: #4e97b9;
      color: #fff;
    }
  }
}
</style>
