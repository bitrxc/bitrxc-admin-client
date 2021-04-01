<template>
  <div class="order-details">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="custom-breadcurmb">
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
      <el-breadcrumb-item>预约详情</el-breadcrumb-item>
    </el-breadcrumb>

    <table>
      <tr>
        <td><div>预约编号</div></td>
        <td>{{ tableData.id }}</td>
      </tr>
      <tr>
        <td>预约人</td>
        <td>{{ tableData.launcher }}</td>
      </tr>
      <tr>
        <td>房间编号</td>
        <td>{{ tableData.roomId }}</td>
      </tr>
      <tr>
        <td>房间状态</td>
        <td>{{ tableData.status }}</td>
      </tr>
      <tr>
        <td>预约执行日期</td>
        <td>{{ tableData.launchDate }}</td>
      </tr>
      <tr>
        <td>预约时间段</td>
        <td>{{ tableData.launchTime }}</td>
      </tr>
      <tr>
        <td>审批人</td>
        <td>{{ tableData.conductor }}</td>
      </tr>
      <tr>
        <td>审批时间</td>
        <td>{{ tableData.checkDate }}</td>
      </tr>
    </table>

    <lay-card>
      <template v-slot:title>预约发起人的理由:</template>
      <template v-slot:content>
        {{ userNote }}
      </template>
    </lay-card>

    <el-input
      class="textarea"
      type="textarea"
      :rows="4"
      placeholder="请输入审批意见"
      v-model="checkNote"
    >
    </el-input>
    <div class="approval-box">
      <el-select v-model="value" placeholder="修改状态" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" @click="handleBtnApproval">
        确认
      </el-button>
    </div>
  </div>
</template>

<script>
import LayCard from "@/components/layCard/LayCard";
import { reqSuccess, reqError } from "@/utils/tips";
import { getOrderDetail, checkOrder } from "@/network/order";
export default {
  name: "OrderDetails",
  components: {
    LayCard
  },
  data() {
    return {
      orderId: this.$route.query.orderId,
      tableData: {},
      userNote: "",
      // 如果需要审批时要修改的字段
      status: "",
      conductor: "",
      checkNote: "",
      checkDate: null,
      dialogApprovalVisible: false,
      options: [
        { value: "new", label: "待审核" },
        { value: "receive", label: "已批准" },
        { value: "signed", label: "已签到" },
        { value: "illegal", label: "未签退" },
        { value: "finished", label: "已签退" },
        { value: "missed", label: "爽约" },
        { value: "reject", label: "已驳回" },
        { value: "cancel", label: "用户撤回" }
      ],
      value: ""
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
          console.log(res);
          if (res.code !== 200) {
            return reqError("获取数据失败");
          }
          this.tableData = res.data.appointment;
        })
        .catch(err => {
          console.log(err);
          return reqError("网络故障");
        });
    },
    reuseCheckOrder() {
      if (this.checkNote === "") {
        return reqError("请填写审批意见");
      }
      if (this.value === "") {
        return reqError("请选择修改状态");
      }
      let data = {
        status: this.value,
        conductor: this.conductor,
        checkNote: this.checkNote
      };
      checkOrder(this.orderId, data)
        .then(result => {
          const res = result.data;
          console.log(res);
          if (res.code !== 200) {
            return reqError(res.message);
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
    // 处理申请
    handleBtnApproval() {
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
.approval-box {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  padding: 15px;
}
.approval-box > .el-button {
  margin: 0 10px;
}

table {
  width: 100%;
}
table tr {
  border: 1px solid #ccc;
  background: #eeefff;
}
table td {
  padding: 5px 7px;
  color: #666;
}
table td div {
  width: 100px;
}
</style>
