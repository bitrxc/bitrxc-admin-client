<template>
  <div class="order-list">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
      <el-breadcrumb-item>预约列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="card">
      <el-input type="text">
        <template #append>
          <el-button icon="el-icon-search"></el-button>
        </template>
      </el-input>

      <!-- 用户列表 -->
      <el-table
        class="role-table"
        :data="tableData"
        style="width: 100%"
        height="420"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="预约编号"></el-table-column>
        <el-table-column prop="roomId" label="房间编号"></el-table-column>
        <el-table-column prop="launcher" label="预约人"></el-table-column>
        <el-table-column prop="execDate" label="预约日期"></el-table-column>
        <el-table-column prop="launchTime" label="预约时间"></el-table-column>
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
        <el-table-column label="操作" width="180">
          <!-- 审批按钮 -->
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handelBtnClick(scope.row.id)"
            >
              审批
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[4, 8, 12]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElement"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  data() {
    return {
      totalPage: null,
      totalElement: null,
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前每页显示多少条
        pageSize: 4
      },
      tableData: []
    };
  },
  methods: {
    // 监听 newPageSize 的改变
    handleSizeChange(newPageSize) {
      console.log(newPageSize);
    },
    // 监听页码值的改变
    handleCurrentChange(newPage) {
      console.log(newPage);
    },
    // 点击按钮进入审批界面
    handelBtnClick(id) {
      console.log(id);
      this.$router.push({
        path: "/approval",
        query: { id }
      });
    }
  },
  async mounted() {
    const { data: res } = await this.$axios.get("appointment", {
      params: {
        current: 1,
        limit: 5
      }
    });
    console.log(res);

    // 给数据赋值
    this.totalPage = res.totalPage;
    this.totalElement = res.totalElement;
    this.tableData = res.items;
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
  }
}
</style>
