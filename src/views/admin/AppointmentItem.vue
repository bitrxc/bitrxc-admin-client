<template>
  <div class="app-item-container">
    <div class="description">
      <el-descriptions title="订单详情" border size="small">
        <el-descriptions-item :label="labels.username">{{ appItem.username }}</el-descriptions-item>
        <el-descriptions-item :label="labels.schoolId">{{ appItem.schoolId }}</el-descriptions-item>
        <el-descriptions-item :label="labels.roomName">{{ appItem.roomName }}</el-descriptions-item>
        <el-descriptions-item :label="labels.execDate">{{ appItem.execDate }}</el-descriptions-item>
        <el-descriptions-item :label="labels.begin">{{ beginTimes[appItem.begin] }}</el-descriptions-item>
        <el-descriptions-item :label="labels.end">{{ endTimes[appItem.end] }}</el-descriptions-item>
        <el-descriptions-item :label="labels.status">{{ statusMap[appItem.status] }}</el-descriptions-item>
        <el-descriptions-item :label="labels.launchDate">{{ appItem.launchDate }}</el-descriptions-item>
        <el-descriptions-item :label="labels.conductor">{{ appItem.conductor }}</el-descriptions-item>
        <el-descriptions-item :label="labels.userNote">{{ appItem.userNote }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="operation-menu">
      <el-form inline :model="appForm">
        <el-form-item label="审批意见: " prop="checkNote">
          <el-input
            type="textarea"
            placeholder="请输入审批意见"
            v-model="appForm.checkNote"
          />
        </el-form-item>
        <el-form-item label="修改状态" prop="status">
          <el-select v-model="appForm.status" placeholder="选择订单状态">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleCheck">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

export default {
  setup () {
    /** @type {{proxy:import("../../main").LocalComponentInstance}} 访问 app 实例上挂载的各插件 */
    const { proxy } = getCurrentInstance()
    const beginTimes = proxy.$store.getters.beginTimes
    const endTimes = proxy.$store.getters.endTimes
    const appItem = ref({})
    const appForm = reactive({
      id: proxy.$route.params.id,
      status: '',
      conductor: proxy.$store.getters.username,
      checkNote: ''
    })

    const labels = ref({
      id: '订单编号',
      username: '姓名',
      schoolId: '学号',
      roomName: '房间名字',
      execDate: '预定时间',
      begin: '开始时间',
      end: '结束时间',
      status: '订单状态',
      launchDate: '下单时间',
      conductor: '审批人',
      userNote: '原因'
    })

    const statusOptions = [
      { value: 'new', label: '待审核' },
      { value: 'receive', label: '已批准' },
      { value: 'signed', label: '已签到' },
      { value: 'illegal', label: '未签退' },
      { value: 'finish', label: '已签退' },
      { value: 'missed', label: '爽约' },
      { value: 'reject', label: '已驳回' },
      { value: 'cancel', label: '用户撤回' }
    ]
    const statusMap = {}
    statusOptions.forEach(item => {
      statusMap[item.value] = item.label
    })
    onMounted(() => {
      getAppointmentItem()
    })

    const getAppointmentItem = async () => {
      const { appointment } = await proxy.$api.appointmentItem({ id: proxy.$route.params.id })
      appItem.value = appointment
    }

    const handleCheck = async () => {
      const res = await proxy.$api.appointmentCheck(appForm)
      console.log(res)
    }

    return {
      labels,
      statusOptions,
      appItem,
      appForm,
      beginTimes,
      endTimes,
      statusMap,
      handleCheck
    }
  }
}
</script>

<style lang="less" scoped>
.app-item-container {
  height: 100%;
  max-width: 900px;
  .description {
    padding: 20px;
    background-color: #fff;
  }
  .operation-menu {
    margin-top: 20px;
    padding: 20px;
    background-color: #fff;
    .el-form {
      .el-button {
        background-color: #4e97b9;
        color: #fff;
      }
    }
  }
}
</style>
