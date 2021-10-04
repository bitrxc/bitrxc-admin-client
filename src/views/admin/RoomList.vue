<template>
  <div class="room-list-container">
    <div class="operation-menu">
      <el-button @click="roomFormVisible = true">新增房间</el-button>
    </div>
    <el-table :data="roomList">
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
      >
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" @click="handleRoomDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新建房间" v-model="roomFormVisible">
      <el-form :model="roomForm">
        <el-form-item label="名字">
          <el-input v-model="roomForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="roomForm.description" />
        </el-form-item>
        <el-form-item label="图片">
          <el-input v-model="roomForm.images" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="roomFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleRoomAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue'

export default {
  setup () {
    const roomFormVisible = ref(false)
    const roomForm = ref({
      username: '',
      password: '',
      email: '',
      mobile: ''
    })
    const roomList = ref([])
    const columns = ref([
      { label: '名称', prop: 'name', width: '100' },
      { label: '描述', prop: 'description', width: '' }
    ])

    const { proxy } = getCurrentInstance()

    onMounted(() => {
      getRoomList()
    })

    const getRoomList = async () => {
      const { rooms } = await proxy.$api.roomList()
      roomList.value = rooms
    }

    // 点击审批打开新窗口
    const handleExamine = (row) => {
      const newWindowPath = proxy.$router.resolve({
        path: `/roomItem/${row.id}`
      })
      window.open(newWindowPath.href, '_target')
    }

    // 添加房间
    const handleRoomAdd = async () => {
      await proxy.$api.roomAdd(roomForm)
      proxy.$message.success('添加成功')
      roomFormVisible.value = false
      roomForm.value = {}
      getRoomList()
    }

    // 修改房间信息
    const handleEdit = (row) => {
      const newWindowPath = proxy.$router.resolve({
        path: `/roomItem/${row.id}`
      })
      window.open(newWindowPath.href, '_target')
    }

    // 删除房间
    const handleRoomDelete = async (row) => {
      await proxy.$api.roomDelete(row)
      proxy.$message.success('删除成功')
      getRoomList()
    }

    return {
      roomForm,
      roomFormVisible,
      roomList,
      columns,
      status,
      handleExamine,
      handleRoomAdd,
      handleRoomDelete,
      handleEdit
    }
  }
}
</script>

<style lang="less" scoped>
.room-list-container {
  .operation-menu {
    height: 50px;
    padding: 0 20px;
    margin-bottom: 20px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-button {
      color: #fff;
      background-color: #4e97b9;
    }
  }
  .pager {
    height: 40px;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
