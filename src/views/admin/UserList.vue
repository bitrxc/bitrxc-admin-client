<template>
  <div class="user-list-container">
    <el-table :data="userList">
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
          <el-button type="text" @click="handleEdit(scope.row)">切换状态</el-button>
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
  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

export default {
  setup () {
    const userForm = reactive({
      username: '',
      password: '',
      name: '',
      phone: '',
      schoolId: '',
      organization: '',
      checked: ''
    })
    const userList = ref([])
    const searchForm = reactive({
      current: 0,
      pagesize: 10
    })
    const pageCount = ref(0)
    const columns = ref([
      { label: '微信标识符', prop: 'username' },
      { label: '姓名', prop: 'name' },
      { label: '手机号', prop: 'phone' },
      { label: '学号', prop: 'schoolId' },
      { label: '所属组织', prop: 'organization' },
      { label: '状态', prop: 'checked', formatter: (row) => (row.checked ? '已检查' : '未检查') }
    ])

    /** @type {{proxy:import("../../main").LocalComponentInstance}} 访问 app 实例上挂载的各插件 */
    const { proxy } = getCurrentInstance()

    onMounted(() => {
      getUserList()
    })

    const getUserList = async () => {
      const { items, totalPages } = await proxy.$api.getUserInfoByExample({
        current: searchForm.current,
        limit: searchForm.pagesize,
        userInfo: {}
      })
      userList.value = items
      pageCount.value = totalPages
      console.log(items)
    }

    // 改变页码
    const currentChange = async (current) => {
      searchForm.current = current - 1
      getUserList()
    }

    // 切换用户状态
    const handleEdit = async (row) => {
      await proxy.$api.checkUser({
        username: row.username,
        check: !row.checked
      })
      row.checked = !row.checked
    }

    return {
      userForm,
      userList,
      searchForm,
      columns,
      pageCount,
      currentChange,
      handleEdit
    }
  }
}
</script>

<style lang="less" scoped>
.user-list-container {
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
