<template>
  <div class="order-list-container">
    <div class="select-menu">
      <div class="left">
        <el-input placeholder="请输入学号" style="max-width: 200px" v-model="stuId" />
        <el-button @click="handleSearch">搜索</el-button>
      </div>
      <div class="right">
        <el-select v-model="status" placeholder="选择订单状态" @change="handleSelectStatus">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <el-table :data="appointmentList">
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
      >
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="text">审批</el-button>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
        :page-count="pageCount"
        layout="prev, pager, next"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance, watch } from 'vue'

export default {
  setup () {
    const stuId = ref('')
    const status = ref('')
    const appointmentList = ref([])
    const searchForm = reactive({
      current: 0,
      limit: 10
    })
    const pageCount = ref(0)
    const columns = ref([
      { label: '姓名', prop: 'username' },
      { label: '学号', prop: 'schoolId' },
      { label: '房间名字', prop: 'roomName' },
      { label: '预定日期', prop: 'execDate' },
      { label: '开始时间', prop: 'begin' },
      { label: '结束时间', prop: 'end' },
      { label: '订单状态', prop: 'status' },
      { label: '下单时间', prop: 'launchDate' }
    ])
    const statusOptions = ref([
      { value: '', label: '全部' },
      { value: 'new', label: '待审核' },
      { value: 'receive', label: '已批准' },
      { value: 'signed', label: '已签到' },
      { value: 'illegal', label: '未签退' },
      { value: 'finish', label: '已签退' },
      { value: 'missed', label: '爽约' },
      { value: 'reject', label: '已驳回' },
      { value: 'cancel', label: '用户撤回' }
    ])
    const { proxy } = getCurrentInstance()

    onMounted(() => {
      getAppointmentList()
    })

    watch(stuId, (stuId) => {
      if (stuId === '') {
        getAppointmentList()
      }
    })

    const getAppointmentList = async () => {
      const { items, totalPages } = await proxy.$api.appointmentList(searchForm)
      appointmentList.value = items
      pageCount.value = totalPages
    }

    const currentChange = async (current) => {
      searchForm.current = current - 1
      getAppointmentList()
    }

    const handleSearch = async () => {
      searchForm.schoolId = stuId
      getAppointmentList()
    }

    const handleSelectStatus = async () => {
      searchForm.status = status
      getAppointmentList()
    }

    return {
      stuId,
      appointmentList,
      searchForm,
      columns,
      pageCount,
      status,
      statusOptions,
      currentChange,
      handleSearch,
      handleSelectStatus
    }
  }
}
</script>

<style lang="less" scoped>
.order-list-container {
  .select-menu {
    height: 50px;
    margin-bottom: 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
