<template>
  <div class="manager-list-container">
    <div class="operation-menu">
      <el-button @click="managerFormVisible = true">新增管理员</el-button>
    </div>
    <el-table :data="managerList">
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)">修改</el-button>
          <el-button type="text" @click="handleManagerDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
      <el-pagination
        :page-count="pageCount"
        layout="prev, pager, next"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>

    <el-dialog title="新建管理员" v-model="managerFormVisible">
      <el-form :model="managerForm">
        <el-form-item label="名字">
          <el-input v-model="managerForm.username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="managerForm.password" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="managerForm.email" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="managerForm.mobile" />
        </el-form-item>
      </el-form>

      <el-dialog title="修改管理员" v-model="updateFormVisible">
        <el-form :model="managerForm">
          <el-form-item label="名字">
            <el-input v-model="managerForm.username" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="managerForm.email" />
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="managerForm.mobile" />
          </el-form-item>
        </el-form>
      </el-dialog>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="managerFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleManagerAdd">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <button @click="test">测试分配</button>
  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

export default {
  setup () {
    const managerFormVisible = ref(false)
    const managerForm = reactive({
      username: '',
      password: '',
      email: '',
      mobile: ''
    })
    const managerList = ref([])
    const searchForm = reactive({
      pagenum: 0,
      pagesize: 10
    })
    const pageCount = ref(0)
    const columns = ref([
      { label: '姓名', prop: 'username' },
      { label: '邮箱', prop: 'email' },
      { label: '手机', prop: 'mobile' },
      {
        label: '角色',
        prop: 'roleList'
        // formatter (row) {
        //   return row.roleList[0].roleName
        // }
      }
    ])

    /** @type {{proxy:import("../../main").LocalComponentInstance}} 访问 app 实例上挂载的各插件 */
    const { proxy } = getCurrentInstance()

    onMounted(() => {
      getManagerList()
    })

    const getManagerList = async () => {
      const { items, totalPages } = await proxy.$api.managerList(searchForm)
      managerList.value = items
      pageCount.value = totalPages
    }

    // 改变页码
    const currentChange = async (current) => {
      searchForm.current = current - 1
      getManagerList()
    }

    /** 点击审批打开新窗口
     * @deprecated 界面内没有其他路由控件，请使用侧边栏路由 */
    const handleExamine = (row) => {
      const newWindowPath = proxy.$router.resolve({
        path: `/appointmentItem/${row.id}`
      })
      window.open(newWindowPath.href, '_target')
    }

    // 添加管理员
    const handleManagerAdd = async () => {
      await proxy.$api.managerAdd(managerForm)
      proxy.$message.success('添加成功')
      managerFormVisible.value = false
      managerForm.value = {}
      getManagerList()
    }

    // 修改管理员信息
    const handleEdit = (row) => {
      const newWindowPath = proxy.$router.resolve({
        path: `/managerItem/${row.id}`
      })
      window.open(newWindowPath.href, '_target')
    }

    // 删除管理员
    const handleManagerDelete = async (row) => {
      await proxy.$api.managerDelete(row)
      proxy.$message.success('删除成功')
      getManagerList()
    }

    const test = async () => {
      await proxy.$api.test()
    }
    return {
      managerForm,
      managerFormVisible,
      managerList,
      searchForm,
      columns,
      pageCount,
      status,
      currentChange,
      handleExamine,
      handleManagerAdd,
      handleManagerDelete,
      handleEdit,
      test
    }
  }
}
</script>

<style lang="less" scoped>
.manager-list-container {
  .operation-menu {
    height: 50px;
    padding: 0 20px;
    margin-bottom: 20px;
    background-color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-button {
      color: #fff;
      background-color: #4e97b9;
    }
  }
  .pager {
    height: 40px;
    margin-top: 20px;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
