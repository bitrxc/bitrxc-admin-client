<template>
<div class="app-manage-container">
  <div class="sel-menu">
    <el-select v-model="roomId" class="m-2" placeholder="选择房间" @change="handleSelectChange">
      <el-option
        v-for="item in roomList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        >
      </el-option>
    </el-select>
  </div>
  <div class="prompt">
    <p>单击订单查看详情：</p>
  </div>
  <div class="calendar">
    <div class="item table-header">时段</div>
    <div class="item table-header">周一</div>
    <div class="item table-header">周二</div>
    <div class="item table-header">周三</div>
    <div class="item table-header">周四</div>
    <div class="item table-header">周五</div>
    <div class="item table-header">周六</div>
    <div class="item table-header">周日</div>
    <template v-for="i in 6" :key="i">
      <div class="item table-header">{{i}}</div>
      <div class="item line-limit-length"
        v-for="item in roomWeekArr[i-1]"
        :key="item"
      >
        <div class="chosen" v-if="item.id!=null" @click="handleClick(item.id)">
          租借人：{{item.username}}<br/>
          学号：{{item.schoolId}}<br/>
          备注：{{item.userNote}}<br/>
          值班人：{{item.conductor}}<br/>
          日期：{{item.execDate}}<br/>
          <div v-if="item.status==='executing'">使用中</div>
          <div v-else-if="item.status==='receive'">审批通过</div>
          <div v-else-if="item.status==='rejected'">审批拒绝</div>
          <div v-else>待审批</div>
        </div>
      </div>
    </template>
  </div>
  <div class="pager">
    <el-pagination
      layout="prev, pager, next"
      :total="250"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
</div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'

export default {
  setup () {
    /** @type {{proxy:import("../../main").LocalComponentInstance}} 访问 app 实例上挂载的各插件 */
    const { proxy } = getCurrentInstance()
    const roomList = proxy.$store.getters.roomList
    const weekBeginDateStr = '2022-02-21' // 学期起始时间
    const weekBeginDate = new Date(weekBeginDateStr)
    const totalAppointList = ref([])
    const monDate = new Date(weekBeginDate.getTime())
    const sunDate = new Date(monDate.getTime() + 6 * 1000 * 3600 * 24)
    const roomId = ref(1)
    const currentPage = ref(1)
    const roomWeekArr = ref([
      [], [], [], [], [], []
    ])
    const initWeekArr = () => {
      for (let k = 0; k < 6; k++) {
        roomWeekArr.value[k].length = 0
        for (let p = 0; p < 7; p++) {
          roomWeekArr.value[k].push({
            id: null,
            username: null,
            schoolId: null,
            userNote: null,
            conductor: null,
            execDate: null,
            status: null
          })
        }
      }
    }
    const getDateString = (dateObj) => {
      const Y = dateObj.getFullYear() + '-'
      const M = (dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1) + '-'
      const D = (dateObj.getDate() < 10 ? '0' + dateObj.getDate() : dateObj.getDate())
      return Y + M + D
    }
    // 获取某房间一周预约记录
    const getRoomAppList = async () => {
      initWeekArr()
      const monDatStr = getDateString(monDate)
      const sunDatStr = getDateString(sunDate)
      for (var item of totalAppointList.value) {
        if (
          item.roomId === roomId.value &&
          item.execDate >= monDatStr &&
          item.execDate <= sunDatStr
        ) {
          var tmpDay = new Date(item.execDate)
          var tmpWeekDay = tmpDay.getDay()
          var tmpTime = item.begin
          if (tmpWeekDay === 0) {
            tmpWeekDay = 6
          } else {
            tmpWeekDay--
          }
          roomWeekArr.value[tmpTime - 1][tmpWeekDay] = {
            id: item.id,
            username: item.username,
            schoolId: item.schoolId,
            userNote: item.userNote,
            conductor: item.conductor,
            execDate: item.execDate,
            status: item.status
          }
        }
      }
    }
    // 获取所有预约记录
    const getTotalAppointList = async () => {
      const { totalPages } = await proxy.$api.appointmentList({
        current: 0,
        limit: 10
      })
      const { items } = await proxy.$api.appointmentList({
        current: 0,
        limit: 10 * totalPages
      })
      totalAppointList.value = items
      getRoomAppList()
    }
    // 选择房间
    const handleSelectChange = () => {
      getRoomAppList()
    }
    // 选择周次
    const handlePageChange = (current) => {
      currentPage.value = current
      monDate.setTime(weekBeginDate.getTime() + (currentPage.value - 1) * 7 * 1000 * 3600 * 24)
      sunDate.setTime(monDate.getTime() + 6 * 1000 * 3600 * 24)
      getRoomAppList()
    }
    // 单击订单
    const handleClick = (orderNum) => {
      const newWindowPath = proxy.$router.resolve({
        path: `/appointmentItem/${orderNum}`
      })
      window.open(newWindowPath.href, '_target')
    }
    initWeekArr()
    // ajax 轮询实时更新订单
    const timeRef = ref(0)
    onMounted(() => {
      getTotalAppointList()
      timeRef.value = setInterval(() => {
        getTotalAppointList()
      }, 1000 * 30)
    })
    // 组件销毁前，清除定时器，避免内存泄漏
    onBeforeUnmount(() => {
      clearInterval(timeRef.value)
    })
    return {
      roomId,
      roomList,
      currentPage,
      roomWeekArr,
      handlePageChange,
      handleSelectChange,
      handleClick
    }
  }
}
</script>

<style lang="less" scoped>
.app-manage-container {
  .sel-menu {
    height: 50px;
    margin-bottom: 20px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .m-2{
    margin-left: 40px;
    }
  }
  .prompt {
    padding-top: 15px;
    padding-left: 30px;
    padding-bottom: 0px;
    font-size: 18px;
    background-color: #fff;
  }
  .calendar {
    padding: 30px;
    display: grid;
    background-color: #fff;
    grid-template-columns: repeat(8, 113px);
    grid-template-rows: repeat(7, 93px);
    place-items: stretch stretch;
    font-size: 12px;
    .item {
      text-align: center;
      line-height: 15px;
      border: 1px solid rgb(58, 57, 57);
      margin-right: 0px;
      margin-bottom: 0px;
      border-collapse: collapse;
      .chosen {
        cursor: pointer;
        text-align: left;
        padding-left: 3px;
      }
    }
    .line-limit-length {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .table-header {
      font-size: 18px;
      padding-top: 45px;
    }
  }
  .pager {
    height: 40px;
    margin-top: 10px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
