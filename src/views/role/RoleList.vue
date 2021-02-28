<template>
  <div class="role-list">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
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
        height="400"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="state" label="状态">
          <template #default="scope">
            <el-switch
              v-model="scope.row.state"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <!-- 修改按钮 -->
          <el-button type="primary" icon="el-icon-edit" size="mini">
          </el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini">
          </el-button>
          <!-- 分配角色按钮 -->
          <el-tooltip effect="dark" content="分配角色按钮" placement="top">
            <el-button type="warning" icon="el-icon-setting" size="mini">
            </el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="50"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RoleList",
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pageNum: 1,
        // 当前每页显示多少条
        pageSize: 5
      },
      tableData: [
        {
          name: "李俊霖",
          email: "1808150553@qq.com",
          phone: "15910921962",
          role: "超级管理员",
          state: true
        },
        {
          name: "李俊霖",
          email: "1808150553@qq.com",
          phone: "15910921962",
          role: "超级管理员",
          state: true
        },
        {
          name: "李俊霖",
          email: "1808150553@qq.com",
          phone: "15910921962",
          role: "超级管理员",
          state: true
        },
        {
          name: "李俊霖",
          email: "1808150553@qq.com",
          phone: "15910921962",
          role: "超级管理员",
          state: true
        }
      ]
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
    // 用户状态的改变
    async userStateChanged(userInfo) {
      const { data: res } = await this.$axios.put(
        `user/${userInfo.name}/state/${userInfo.state}`
      );
      if (res.data.state !== 200) {
        userInfo.state = !userInfo.state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户状态成功");
    }
  }
};
</script>

<style lang="scss" scoped>
.role-list {
  .breadcrumb {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .card {
    .role-table {
      margin-top: 20px;
    }
  }
}
</style>
