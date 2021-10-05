<template>
  <div class="admin-appoint-container">
    <div class="calendar">
      <div class="item">时段</div>
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
      <div class="item">6</div>

      <div class="item">周一</div>
      <div class="item"
        v-for="item in weekArrRef[0]"
        :key="item.id"
        :style="{ background: item.color }"
        @click="handleTimeItemClick(item)"
      >
        {{ item.text }}
      </div>

      <div class="item">周二</div>
      <div class="item"
        v-for="item in weekArrRef[1]"
        :key="item.id"
        :style="{ background: item.color }"
        @click="handleTimeItemClick(item)"
      >
        {{ item.text }}
      </div>

      <div class="item">周三</div>
      <div class="item"
        v-for="item in weekArrRef[2]"
        :key="item.id"
        :style="{ background: item.color }"
        @click="handleTimeItemClick(item)"
      >
        {{ item.text }}
      </div>

      <div class="item">周四</div>
      <div class="item"
        v-for="item in weekArrRef[3]"
        :key="item.id"
        :style="{ background: item.color }"
        @click="handleTimeItemClick(item)"
      >
        {{ item.text }}
      </div>

      <div class="item">周五</div>
      <div class="item"
        v-for="item in weekArrRef[4]"
        :key="item.id"
        :style="{ background: item.color }"
        @click="handleTimeItemClick(item)"
      >
        {{ item.text }}
      </div>

      <div class="item">周六</div>
      <div class="item"
        v-for="item in weekArrRef[5]"
        :key="item.id"
        :style="{ background: item.color }"
        @click="handleTimeItemClick(item)"
      >
        {{ item.text }}
      </div>

      <div class="item">周日</div>
      <div class="item"
        v-for="item in weekArrRef[6]"
        :key="item.id"
        :style="{ background: item.color }"
        @click="handleTimeItemClick(item)"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'
// import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

export default {
  setup () {
    const { proxy } = getCurrentInstance()

    const roomList = proxy.$store.getters.roomList
    const weekArrRef = ref([
      [], [], [], [], [], [], []
    ])

    onMounted(() => {
      getWeekTime()
    })

    const getWeekTime = async () => {
      for (let i = 0; i < weekArrRef.value.length; i++) {
        weekArrRef.value[i] = await getOneDayTime()
      }
    }

    const getOneDayTime = async () => {
      const arr = []
      const { busyTime, freeTime, myTime, passTime } = await proxy.$api.roomFreeTime()
      busyTime.forEach(item => {
        item.status = 'busy'
        item.color = '#c0c0c0'
        item.text = '被占用'
      })
      freeTime.forEach(item => {
        item.status = 'free'
        item.color = '#4e97b9'
        item.text = '空闲中'
      })
      myTime.forEach(item => {
        item.status = 'my'
        item.color = '#3cb371'
        item.text = '已成功'
      })
      passTime.forEach(item => {
        item.status = 'pass'
        item.text = '来晚了'
      })
      arr.push(...busyTime, ...freeTime, ...myTime, ...passTime)
      // 让 arr 按照 id 排序
      const cmp = (obj1, obj2) => {
        if (obj1.id < obj2.id) {
          return -1
        } else if (obj1.id > obj2.id) {
          return 1
        } else {
          return 0
        }
      }
      return arr.sort(cmp)
    }

    const handleTimeItemClick = (item) => {
      if (item.status === 'free') {
        item.status = 'checked'
        item.color = '#ff6347'
        item.text = '被选中'
      } else if (item.status === 'checked') {
        item.status = 'free'
        item.color = '#4e97b9'
        item.text = '空闲中'
      }
      console.log(item)
    }

    return {
      roomList,
      weekArrRef,
      handleTimeItemClick
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
  height: 320px;
  display: grid;
  background-color: #eef0f3;
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
