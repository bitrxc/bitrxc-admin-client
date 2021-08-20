<template>
  <header>
    <r-header>
      <template #search>
        <el-input placeholder="请输入预约者的学号" style="max-width: 250px;" />
      </template>
      <template #selector>
        <span>预约状态</span>
        <el-select v-model="value" style="margin-left: 10px;">
          <el-option v-for="item in options" :key="item" :value="item.value">
            {{ item.label }}
          </el-option>
        </el-select>
      </template>
    </r-header>
  </header>
  <main>
    <el-table :dataSource="orderArray">
      <el-table-column
        v-for="item in columns"
        :key="item.label"
        :label="item.label"
        :prop="item.prop"
      >
      </el-table-column>
    </el-table>
  </main>
</template>
<script>
import RHeader from "@/components/header/RHeader.vue";
import options from "./options";
import columns from "./columns";
import { getOrderList } from "@/api/order.js";

export default {
  components: {
    RHeader
  },
  data() {
    return {
      value: "",
      options,
      columns,
      orderArray: []
    };
  },
  async created() {
    try {
      const orders = await getOrderList(this.current, this.limit, "");
      this.orderArray = orders.data.data.items;
    } catch (e) {
      console.log("获取数据失败");
      console.error(e);
    }
  }
};
</script>

<style scoped>
header {
  height: 64px;
  padding: 0 10px;
  border-bottom: 2px solid #ccc;
}
</style>
