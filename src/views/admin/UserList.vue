<template>
  <div class="user-list">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
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
        height="300"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="管理员编号"></el-table-column>
        <el-table-column prop="username" label="管理员姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="roleName" label="角色">
          <template #default="scope">
            <el-tag v-if="scope.row.status === '超级管理员'" type="success">
              {{ scope.row.roleName }}
            </el-tag>
            <el-tag v-else type="info">
              {{ scope.row.roleName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <el-tooltip effect="dark" content="分配角色" placement="top">
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="handelBtnClick(scope.row.id)"
              size="mini"
            >
            </el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除管理员" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handelBtnClick(scope.row.id)"
              size="mini"
            >
            </el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>

      <lay-btns-container>
        <template v-slot:left>
          <el-button type="primary" @click="dialogAddVisible = true">
            新增管理员
          </el-button>
        </template>
      </lay-btns-container>

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

    <!-- 对话框区域 -->
    <div>
      <!-- 选择管理员类型 -->
      <el-dialog
        title="分配角色"
        v-model="dialogAllocateVisible"
        v-bind:before-close="handleClose"
      >
        <el-select v-model="roleValue" placeholder="请选择">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-dialog>
      <!-- 添加管理员对话框 -->
      <el-dialog
        title="增加管理员"
        v-model="dialogAddVisible"
        v-bind:before-colose="handleClose"
      >
        <el-form :label-position="labelPosition" :model="formAddAdmin">
          <el-form-item label="姓名">
            <el-input v-model="formAddAdmin.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="formAddAdmin.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formAddAdmin.email"></el-input>
          </el-form-item>
          <el-form-item label="初始密码">
            <el-input v-model="formAddAdmin.password"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              确 定
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import LayBtnsContainer from "@/components/layBtnsContainer/LayBtnsContainer.vue";

export default {
  name: "OrderList",
  components: {
    LayBtnsContainer
  },
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
      tableData: [],
      dialogAllocateVisible: false,
      dialogAddVisible: false,
      roleOptions: [
        { value: "普通管理员", label: "普通管理员" },
        { value: "超级管理员", lable: "超级管理员" }
      ],
      roleValue: "",
      labelPosition: "right",
      formAddAdmin: {
        username: "",
        mobile: "",
        email: "",
        password: ""
      }
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
    const { data: res } = await this.$axios.get("user", {
      params: {
        current: 1,
        limit: 4
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
.user-list {
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
