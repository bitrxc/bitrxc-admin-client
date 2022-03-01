<template>
  <div class="room-item-container">
    <div class="description">
      <el-descriptions title="房间详情" border size="small" :column="1">
        <el-descriptions-item :label="labels.name">{{ roomItem.name }}</el-descriptions-item>
        <el-descriptions-item :label="labels.description">
          {{ roomItem.description }}
          <!-- TODO: Use JsonEditor to display this string
             <JsonEditorVue
            v-model="jsonData" language="zh-CN" currentMode="view"
            :modeList='["view"]'
            :options='{
              navigationBar: false,
              mainMenuBar: false
            }'
          /> -->
        </el-descriptions-item>
        <el-descriptions-item :label="labels.images">
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
          <JsonEditorVue class="editor"
            v-model="jsonData" language="zh-CN" currentMode="form"
            :modeList='["tree", "code", "form", "view"]'
            :options='{
              navigationBar: false
            }'
            @change="handleJsonChange" />
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
import { ref, reactive, onMounted, getCurrentInstance } from 'vue'
import JsonEditorVue from 'json-editor-vue3'
export default {
  components: { JsonEditorVue },
  setup () {
    /** @type {{proxy:import("../../main").LocalComponentInstance}} 访问 app 实例上挂载的各插件 */
    const { proxy } = getCurrentInstance()
    const roomItem = reactive({})
    const roomItemVisible = ref(false)
    const jsonData = ref({})
    const labels = ref({
      id: '房间编号',
      name: '名字',
      images: '图片',
      description: '描述'
    })

    onMounted(() => {
      getRoomItem()
    })

    const handleJsonChange = () => {
      roomItem.description = JSON.stringify(jsonData.value)
    }

    const getRoomItem = async () => {
      const { roomInfo } = await proxy.$api.roomItem({ id: proxy.$route.params.id })
      Object.assign(roomItem, roomInfo)
      jsonData.value = JSON.parse(roomInfo.description)
    }

    const handleRoomUpdate = async () => {
      // 后端历史遗留问题
      // 后端返回给前端的图片，字符名称叫做 images
      // 前端要修改时，字段名称却应该是 image
      roomItem.image = roomItem.images
      delete roomItem.images
      await proxy.$api.roomUpdate(roomItem)
      proxy.$message.success('修改成功')
      roomItemVisible.value = false
      getRoomItem()
    }

    return {
      jsonData,
      labels,
      roomItem,
      roomItemVisible,
      handleRoomUpdate,
      handleJsonChange
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
