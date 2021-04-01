<template>
  <div class="order-details">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="custom-breadcurmb">
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
      <el-breadcrumb-item>预约详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 预约状态: 前半部分 -->
    <el-table
      class="order-table"
      :data="tableData"
      style="width: 100%"
      height="120"
      border
      stripe
    >
      <el-table-column prop="id" label="预约编号"></el-table-column>
      <el-table-column prop="launcher" label="预约人"></el-table-column>
      <el-table-column prop="roomId" label="房间编号"></el-table-column>
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
    </el-table>

    <!-- 预约状态: 后半部分 -->
    <el-table
      class="order-table"
      :data="tableData"
      style="width: 100%"
      height="120"
      border
      stripe
    >
      <el-table-column prop="execDate" label="预约执行日期"></el-table-column>
      <el-table-column prop="launchTime" label="预约时间段"></el-table-column>
      <el-table-column prop="conductor" label="审批人"></el-table-column>
      <el-table-column prop="checkDate" label="审批时间"></el-table-column>
    </el-table>

    <lay-card>
      <template v-slot:default>预约发起人的理由: {{ userNote }}</template>
    </lay-card>

    <el-input
      class="textarea"
      type="textarea"
      :rows="4"
      placeholder="请输入审批意见"
      v-model="checkNote"
    >
    </el-input>

    <lay-btns-container v-if="status === 'reject' || status === 'receive'">
      <template v-slot:left>
        <el-button type="danger" disabled>
          拒绝
        </el-button>
      </template>
      <template v-slot:right>
        <el-button type="success" disabled>
          同意
        </el-button>
      </template>
    </lay-btns-container>
    <lay-btns-container v-else>
      <template v-slot:left>
        <el-button type="danger" @click="handleBtnReject">
          拒绝
        </el-button>
      </template>
      <template v-slot:right>
        <el-button type="success" @click="handleBtnReceive">
          同意
        </el-button>
      </template>
    </lay-btns-container>
  </div>
</template>

<script>
import LayCard from "@/components/layCard/LayCard";
import LayBtnsContainer from "@/components/layBtnsContainer/LayBtnsContainer.vue";
import { reqSuccess, reqError } from "@/utils/tips";
import { getOrderDetail, checkOrder } from "@/network/order";
export default {
  name: "OrderDetails",
  components: {
    LayCard,
    LayBtnsContainer
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      tableData: [],
      userNote: "",
      // 如果需要审批时要修改的字段
      status: "",
      conductor: "",
      checkNote: "",
      checkDate: null,
      dialogApprovalVisible: false
    };
  },
  created() {
    this.reuseGetOrderDetail();
  },
  methods: {
    reuseGetOrderDetail() {
      getOrderDetail(this.orderId)
        .then(result => {
          const res = result.data;
          if (res.code !== 200) {
            return reqError("获取数据失败");
          }

          this.tableData = [res.data.appointment];
          this.userNote = res.data.userNote;
          this.checkNote = res.data.appointment.checkNote;
          this.status = res.data.appointment.status;
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    reuseCheckOrder() {
      let data = {
        status: this.status,
        conductor: this.conductor,
        checkNote: this.checkNote
      };
      checkOrder(this.orderId, data)
        .then(result => {
          const res = result.data;
          if (res.data !== 200) {
            return reqError("审批提交失败");
          }
          // 成功, 再次请求数据
          this.reuseGetOrderDetail();
          return reqSuccess("审批提交成功");
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    // 处理拒绝申请
    handleBtnReject() {
      this.status = "reject";
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      this.conductor = userInfo.username;
      this.reuseCheckOrder();
    },
    // 处理同意申请
    handleBtnReceive() {
      this.status = "receive";
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      this.conductor = userInfo.username;
      this.reuseCheckOrder();
    }
  }
};
</script>

<style scoped>
.custom-breadcurmb {
  padding: 5px;
  padding-bottom: 10px;
}
</style>
