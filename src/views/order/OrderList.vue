<template>
  <div class="order-list">
    <!-- 搜索区域 -->
    <el-input
      type="text"
      v-model="searchValue"
      clearable
      @clear="handleClear"
      placeholder="请输入预约者的学号"
    >
      <template #append>
        <el-button icon="el-icon-search" @click="handleBtnSearch"></el-button>
      </template>
    </el-input>

    <!-- 用户列表 -->
    <el-table class="custom-table" :data="tableData" height="580" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="launchDate" label="预约创建时间">
        <template #default="scope">
          {{ correctedLaunchDate(scope.row.launchDate) }}
        </template>
      </el-table-column>
      <el-table-column prop="roomName" label="房间编号"></el-table-column>
      <el-table-column prop="username" label="预约人"></el-table-column>
      <el-table-column prop="launchTime" label="预约时间">
        <template #default="scope">
          <el-tag>
            {{ correctedTimeBegin(scope.row.begin) }}
          </el-tag>
          -
          <el-tag>
            {{ correctedTimeEnd(scope.row.end) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dealDate" label="处理时间"></el-table-column>
      <el-table-column prop="status" label="预约状态">
        <template #default="scope">
          <el-tag v-if="scope.row.status === 'receive'" type="success">
            {{ correctedStatus(scope.row.status) }}
          </el-tag>
          <el-tag v-else-if="scope.row.status === 'signed'" type="danger">
            {{ correctedStatus(scope.row.status) }}
          </el-tag>
          <el-tag v-else type="info">
            {{ correctedStatus(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <!-- 审批按钮 -->
        <template #default="scope">
          <el-button type="info" @click="handelBtnClick(scope.row.id)">
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
        :total="totalElements"
        :current-page="current"
        :page-sizes="[10, 20, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        small
        background
      >
      </el-pagination>
      <!-- 房间状态, 自定义分页 -->
      <div class="custom-pagination">
        <div class="custom-span"><span>房间状态</span></div>
        <el-select
          id="custom-select"
          v-model="value"
          placeholder="请选择"
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
  </div>
</template>

<script>
import { getOrderList, searchOrders } from "@/network/order.js";
import { reqError } from "@/utils/tips.js";
import { correctStatus } from "@/utils/status.js";
import {
  correctTimeBegin,
  correctTimeEnd,
  correctLaunchDate
} from "@/utils/time.js";
import { getScheduleArray } from "@/network/utils.js";

export default {
  name: "OrderList",
  data() {
    return {
      tableData: [],
      // 与表单分页有关的数据
      totalPage: null,
      totalElements: null,
      current: 1,
      limit: 10,
      options: [
        { value: "", label: "全部" },
        { value: "new", label: "待审核" },
        { value: "receive", label: "已批准" },
        { value: "signed", label: "已签到" },
        { value: "illegal", label: "未签退" },
        { value: "finish", label: "已签退" },
        { value: "missed", label: "爽约" },
        { value: "reject", label: "已驳回" },
        { value: "cancel", label: "用户撤回" }
      ],
      value: "",
      searchValue: ""
    };
  },
  created() {
    this.reuseGetOrderList();
    getScheduleArray().then(res => {
      const schduleArray = res.data.data;
      sessionStorage.setItem("scheduleArray", JSON.stringify(schduleArray));
    });
  },
  methods: {
    reuseGetOrderList() {
      let correntCurrent = this.current - 1;
      getOrderList(correntCurrent, this.limit, this.value)
        .then(result => {
          // 可以发送网络请求
          const res = result.data;
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
    },
    // 修改 status 从英文变为中文
    correctedStatus(status) {
      return correctStatus(status);
    },
    // 搜索
    handleBtnSearch() {
      console.log("搜索按钮被点击了");
      let correntCurrent = this.current - 1;
      searchOrders(correntCurrent, this.limit, this.searchValue).then(
        result => {
          const res = result.data;
          this.tableData = res.data.items;
        }
      );
    },
    // 清空搜索时触发
    handleClear() {
      this.reuseGetOrderList();
    },
    // 将预约时间从 id 转变为具体时间
    correctedTimeBegin(id) {
      return correctTimeBegin(id);
    },
    correctedTimeEnd(id) {
      return correctTimeEnd(id);
    },
    // 将预约发起时间从时间戳转变为具体时间
    correctedLaunchDate(launchDate) {
      return correctLaunchDate(launchDate);
    }
  }
};
</script>

<style scoped>
.custom-table {
  width: 100%;
}
.paging {
  padding: 5px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.paging .custom-pagination {
  padding: 5px;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
.paging .custom-span {
  height: 28px;
  font-size: 15px;
  line-height: 28px;
  padding: 5px 8px;
  color: #606266;
}
/* 样式穿透 */
.paging ::v-deep(#custom-select) {
  height: 28px;
  line-height: 28px;
}
@media screen and (max-width: 768px) {
  /* 手机屏幕时, 不显示总页数, 前一个、后一个按钮 */
  .paging ::v-deep(.el-pagination) {
    padding: 0;
  }
  body .paging ::v-deep(.el-pagination__total),
  body .paging ::v-deep(.btn-prev),
  body .paging ::v-deep(.el-pager),
  body .paging ::v-deep(.btn-next) {
    display: none;
  }
  .paging ::v-deep(.el-pagination__jump) {
    margin: 0;
  }
}
</style>
