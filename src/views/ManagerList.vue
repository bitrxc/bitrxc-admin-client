<template>
  <div class="order-list-container">
    <div class="select-menu"></div>
    <table>
    </table>
  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

export default {
  setup () {
    const managerList = ref([])
    const searchForm = reactive({
      pagenum: 0,
      pagesize: 10
    })

    const { proxy } = getCurrentInstance()

    const getOrderList = async () => {
      const list = await proxy.$api.managerList(searchForm)
      console.log(list)
    }

    onMounted(() => {
      getOrderList()
    })

    return {
      managerList,
      searchForm
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
  }
}
</style>
