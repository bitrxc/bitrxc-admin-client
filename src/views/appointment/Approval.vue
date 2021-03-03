<template>
  <div class="approval">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
      <el-breadcrumb-item>预约详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="card">
      <el-table
        class="table"
        :data="tableData"
        style="width: 100%"
        height="150"
        border
        stripe
      >
        <el-table-column prop="id" label="预约编号"></el-table-column>
        <el-table-column prop="roomId" label="房间编号"></el-table-column>
        <el-table-column prop="launcher" label="预约人"></el-table-column>
        <el-table-column prop="execDate" label="预约日期"></el-table-column>
        <el-table-column prop="launchDate" label="审批日期"></el-table-column>
        <el-table-column prop="launchTime" label="审批时间"></el-table-column>
        <el-table-column prop="status" label="房间状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 'receive'" type="success">
              {{ scope.row.status }}
            </el-tag>
            <el-tag v-else type="info">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- 申请人的理由 -->
      <lay-card>
        <template v-slot:default>{{ userNote }}</template>
      </lay-card>

      <lay-btns-container>
        <template v-slot:left>
          <el-button type="danger">拒绝</el-button>
        </template>
        <template v-slot:right>
          <el-button type="success">同意</el-button>
        </template>
      </lay-btns-container>

      <el-input
        class="textarea"
        type="textarea"
        :rows="4"
        placeholder="请输入审批意见"
        v-model="checkNote"
      >
      </el-input>

      <lay-btns-container>
        <template v-slot:left>
          <el-button type="primary" @click="dialogApprovalVisible = true">
            完成
          </el-button>
        </template>
      </lay-btns-container>
    </el-card>

    <!-- 审批完成的对话框 -->
    <el-dialog
      title="你确定要完成审批吗?"
      v-model="dialogApprovalVisible"
      v-bind:before-close="handleClose"
      center
    >
      <template #footer>
        <span class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import LayCard from "@/components/layCard/LayCard";
import LayBtnsContainer from "@/components/layBtnsContainer/LayBtnsContainer.vue";
export default {
  name: "Approval",
  components: {
    LayCard,
    LayBtnsContainer
  },
  data() {
    return {
      tableData: [],
      userNote: "",
      checkNote: "",
      dialogApprovalVisible: false
    };
  },
  methods: {
    // 控制弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭?")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  },
  async mounted() {
    const { id } = this.$route.query;
    const { data: res } = await this.$axios.get("appointment/id", {
      params: { id: id }
    });
    console.log(res);
    this.tableData = [res];
    this.userNote = res.userNote;
    this.checkNote = res.checkNote;
  }
};
</script>

<style lang="scss" scoped>
.approval {
  .breadcrumb {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .card {
    .table {
      margin: 20px 0;
    }
  }
}
</style>
