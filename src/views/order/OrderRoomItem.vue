<template>
  <div class="admin-appoint-container">
    <div>
      <el-calendar v-model="value" />

    </div>
    <div class="calendar">
      <div class="item">时段</div>
      <div class="item" v-on:click="selectedTime = 1">1</div>
      <div class="item" v-on:click="selectedTime = 2">2</div>
      <div class="item" v-on:click="selectedTime = 3">3</div>
      <div class="item" v-on:click="selectedTime = 4">4</div>
      <div class="item" v-on:click="selectedTime = 5">5</div>
      <div class="item" v-on:click="selectedTime = 6">6</div>
    </div>
    <p>
      当前选择的日期为：{{value.getFullYear()}}-{{value.getMonth() + 1}}-{{value.getDate()}}<br>
      选择的时间段为：{{selectedTime}}
    </p>
    <el-button @click="submitAppointment">提交</el-button>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from '@vue/runtime-core'
import { ElMessageBox } from 'element-plus'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const value = ref(new Date())
    const selectedTime = ref(1)
    const submitAppointment = async (event) => {
      console.log(event)
      console.log(value)
      proxy.$api.appointmentMany([{
        roomId: proxy.$route.params.id,
        launcher: null,
        launchtime: selectedTime.value,
        conductor: proxy.$store.getters.username,
        execDate: value.value.getFullYear() +
        '-' + value.value.getMonth() + '-' + value.value.getDate()
      }])
      ElMessageBox.alert('预约成功', '提示', {
        confirmButtonText: '确定'
      })
    }
    return {
      selectedTime,
      value,
      submitAppointment
    }
  }
}
</script>

<style lang="less" scoped>
.admin-appoint-container {
  height: 100%;
  max-width: 900px;
  background-color: #fff;
}
.calendar {
  width: 280px;
  height: 50px;
  display: grid;
  background-color: #fff;
  grid-template-columns: repeat(7, 40px);
  grid-template-rows: repeat(8, 40px);
  place-items: stretch stretch;
  cursor: pointer;
  font-size: 12px;
  .item {
    text-align: center;
    line-height: 40px;
    border: 1px solid #000;
    margin-right: -1px;
    margin-bottom: -1px;
    border-collapse: collapse;
  }
}
</style>
