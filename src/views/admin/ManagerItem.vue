<template>
  <div class="manager-list-container">
    <div class="description">
      <el-descriptions title="管理员信息" border size="small" :column="1">
        <el-descriptions-item :label="labels.username">{{ managerForm.username }}</el-descriptions-item>
        <el-descriptions-item :label="labels.email">{{ managerForm.email }}</el-descriptions-item>
        <el-descriptions-item :label="labels.mobile">{{ managerForm.mobile }}</el-descriptions-item>
        <el-descriptions-item :label="labels.roleList">
          <el-tag v-for="role of ownedRole" :key="role.id" >{{ role.roleName }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="operation-menu">
      <el-button @click="updateFormVisible = true">修改管理员信息</el-button>
      <el-button @click="priviledgeFormVisible = true">修改权限</el-button>
    </div>

    <el-dialog title="修改管理员" v-model="updateFormVisible">
      <el-form :model="managerForm">
        <el-form-item label="用户名">
          <el-input v-model="managerForm.username" disabled/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="managerForm.password" show-password disabled/>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="managerForm.email" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="managerForm.mobile" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleManagerUpdate">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="修改权限" v-model="priviledgeFormVisible">
      <el-form :model="ownedRole">
        <el-form-item label="权限列表">
          <el-checkbox  v-for="role of selectableRole.list" :key="role.id" :label="role.roleName" v-model="role.hasRole"></el-checkbox>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="priviledgeFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlePriviledgeUpdate">确 定</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance, toRaw } from 'vue'

export default {
  setup () {
    const updateFormVisible = ref(false)
    const priviledgeFormVisible = ref(false)

    /** @type {import("../../typings/model").Admin} */
    const managerForm = reactive({
      username: '',
      password: '',
      email: '',
      mobile: ''
    })
    const pageCount = ref(0)
    const labels = ref({
      username: '用户名',
      email: '邮箱',
      mobile: '手机',
      roleList: '角色'
    })
    /** @type {{proxy:import('../../main').LocalComponentInstance}} 访问 app 实例上挂载的各插件 */
    const { proxy } = getCurrentInstance()

    const roleList = ref(proxy.$store.getters.roleList)

    /** @type {import("vue").Ref<Array<import("../../typings/model").Role>>} */
    const ownedRole = ref([])

    /** @type {{list:Array<import("../../typings/model").Role>>}} */
    const selectableRole = reactive({ list: [] })

    onMounted(() => {
      getManagerItem()
      console.log(toRaw(managerForm))
    })

    const getManagerItem = async () => {
      const { info } = await proxy.$api.managerItem({ id: proxy.$route.params.id })
      Object.assign(managerForm, info)
      ownedRole.value = info.roleList
      const ownedRoleSet = new Set(ownedRole.value.map(r => r.id))
      const selectableRoleRaw = roleList.value.map(
        (r) => {
          const complex = Object.assign({ hasRole: ownedRoleSet.has(r.id) }, r)
          return complex
        })
      selectableRole.list = selectableRoleRaw
    }

    const handleManagerUpdate = async () => {
      await proxy.$api.managerModify(toRaw(managerForm))
      getManagerItem()
      updateFormVisible.value = false
    }

    const handlePriviledgeUpdate = async () => {
      const roles = selectableRole.list.filter((r) => r.hasRole).map((r) => r.id)
      await proxy.$api.roleAssign({ id: managerForm.id, roles })
      getManagerItem()
      priviledgeFormVisible.value = false
    }

    return {
      labels,
      managerForm,
      ownedRole,
      pageCount,
      priviledgeFormVisible,
      roleList,
      selectableRole,
      updateFormVisible,
      handleManagerUpdate,
      handlePriviledgeUpdate
    }
  }
}
</script>

<style lang="less" scoped>

.manager-list-container {
  height: 100%;
  max-width: 900px;
  .description {
    padding: 20px;
    background-color: #fff;
  }
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
