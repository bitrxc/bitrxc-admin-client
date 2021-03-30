<template>
  <div class="order-list">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
      <el-breadcrumb-item>预约列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="card">
      <!-- 用户列表 -->
      <el-table
        class="role-table"
        :data="tableData"
        style="width: 100%"
        height="380"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="预约编号"></el-table-column>
        <el-table-column prop="roomId" label="房间编号"></el-table-column>
        <el-table-column prop="launcher" label="预约人"></el-table-column>
        <el-table-column prop="launchTime" label="预约时间"></el-table-column>
        <el-table-column prop="dealDate" label="处理时间"></el-table-column>
        <el-table-column prop="status" label="房间状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 'new'" type="success">
              {{ scope.row.status }}
            </el-tag>
            <el-tag v-else type="info">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <!-- 审批按钮 -->
          <template #default="scope">
            <el-button
              v-if="scope.row.status === 'new'"
              type="primary"
              @click="handelBtnClick(scope.row.id)"
            >
              审批
            </el-button>
            <el-button v-else type="info" @click="handelBtnClick(scope.row.id)">
              审批
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <div class="paging">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="current"
          :page-sizes="[5, 10, 20]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalElements"
          background
        >
        </el-pagination>
        <!-- 房间状态, 自定义分页 -->
        <div>
          <span style="margin: 0 5px;">房间状态</span>
          <el-select
            v-model="value"
            placeholder="请选择"
            clearable
            @change="handleValueChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOrderList } from "../../network/order";
import { reqError } from "../../utils/tips";
export default {
  name: "OrderList",
  data() {
    return {
      tableData: [],
      // 与表单分页有关的数据
      totalPage: null,
      totalElements: null,
      current: 1,
      limit: 5,
      options: [
        { value: "executing", label: "executing" },
        { value: "receive", label: "receive" },
        { value: "reject", label: "reject" },
        { value: "new", label: "new" }
      ],
      value: ""
    };
  },
  created() {
    this.reuseGetOrderList();
  },
  methods: {
    reuseGetOrderList() {
      let correntCurrent = this.current - 1;
      getOrderList(correntCurrent, this.limit, this.value)
        .then(result => {
          // 可以发送网络请求
          console.log(result);
          const res = result.data;
          console.log(res);
          if (res.code !== 200) {
            return reqError(res.message.toString());
          }
          this.totalPage = res.data.totalPage;
          this.totalElements = res.data.totalElements;
          this.tableData = res.data.items;
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    // 点击按钮进入审批界面
    handelBtnClick(id) {
      this.$router.push({
        path: "/orderDetails",
        query: {
          orderId: id
        }
      });
    },
    // 监听 limit 的改变
    handleSizeChange(newLimit) {
      this.limit = newLimit;
      this.current = 1;
      this.reuseGetOrderList();
    },
    // 监听 current 的改变
    handleCurrentChange(newCurrent) {
      this.current = newCurrent;
      this.reuseGetOrderList();
    },
    // 监听选中值的改变
    handleValueChange(newValue) {
      this.current = 1;
      this.value = newValue;
      this.reuseGetOrderList();
    }
  }
};
</script>

<style lang="scss" scoped>
.order-list {
  .breadcrumb {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .card {
    .role-table {
      margin: 20px 0;
    }

    .paging {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 13px;
    }
  }
}
</style>
