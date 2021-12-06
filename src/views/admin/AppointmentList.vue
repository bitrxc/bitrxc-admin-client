<template>
  <div class="app-list-container">
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
    <el-table :data="appointmentList" stripe>
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleExamine(scope.row)">审批</el-button>
        </template>
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
import { reactive, ref, onMounted, getCurrentInstance, watch, onBeforeUnmount } from 'vue'

export default {
  setup () {
    /** @type {{proxy:import("../../main").LocalComponentInstance}} 访问 app 实例上挂载的各插件 */
    const { proxy } = getCurrentInstance()
    const beginTimes = proxy.$store.getters.beginTimes
    const endTimes = proxy.$store.getters.endTimes
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
      {
        label: '开始时间',
        prop: 'begin',
        formatter (row) {
          return beginTimes[row.begin]
        }
      },
      {
        label: '结束时间',
        prop: 'end',
        formatter (row) {
          return endTimes[row.end]
        }
      },
      {
        label: '订单状态',
        prop: 'status',
        formatter (row) {
          return statusMap[row.status]
        }
      },
      { label: '下单时间', prop: 'launchDate' }
    ])
    const statusOptions = [
      { value: '', label: '全部' },
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

    // ajax 轮询实时更新订单
    const timeRef = ref(0)
    onMounted(() => {
      getAppointmentList()
      timeRef.value = setInterval(() => {
        getAppointmentList()
      }, 1000 * 30)
    })

    // 组件销毁前，清除定时器，避免内存泄漏
    onBeforeUnmount(() => {
      clearInterval(timeRef.value)
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

    // 改变页码
    const currentChange = async (current) => {
      searchForm.current = current - 1
      getAppointmentList()
    }

    // 根据学号搜索订单
    const handleSearch = async () => {
      searchForm.schoolId = stuId
      getAppointmentList()
    }

    // 选择审批状态之后更新订单列表
    const handleSelectStatus = async () => {
      searchForm.status = status
      getAppointmentList()
    }

    // 点击审批打开新窗口
    const handleExamine = (row) => {
      const newWindowPath = proxy.$router.resolve({
        path: `/appointmentItem/${row.id}`
      })
      window.open(newWindowPath.href, '_target')
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
      handleSelectStatus,
      handleExamine
    }
  }
}
</script>

<style lang="less" scoped>
.app-list-container {
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
