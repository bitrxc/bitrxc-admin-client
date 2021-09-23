<template>
  <main>
    <aside>
      <div>北京理工大学</div>
      <div>
        <span>睿信社区管理系统</span>
        <div class="baseline"><span></span><span></span><span></span></div>
      </div>
    </aside>
    <section>
      <el-form :model="userForm">
        <div class="tips">管理员登入</div>
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名"  v-model="userForm.username"  class="input">
            <template #prefix><i class="el-icon-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码"  v-model="userForm.password"  class="input">
            <template #prefix><i class="el-icon-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </main>
</template>

<script>
import { reactive, getCurrentInstance } from 'vue'

export default {
  components: {},
  setup () {
    const { proxy } = getCurrentInstance()
    const userForm = reactive({
      username: '',
      password: ''
    })

    const handleLogin = async () => {
      const res = await proxy.$api.login(userForm)
      proxy.$store.commit('saveUserInfo', res)
      proxy.$router.push('/')
      proxy.$message.success('登录成功')

      // 获取房间信息保存到 vuex
      const { rooms } = await proxy.$api.roomList()
      proxy.$store.commit('saveRoomList', rooms)

      // 获取时间列表信息保存到 vuex
      const { beginTimes, endTimes } = await proxy.$api.timeList()
      proxy.$store.commit('saveBeginTimes', beginTimes)
      proxy.$store.commit('saveEndTimes', endTimes)
    }

    return {
      userForm,
      handleLogin
    }
  }
}
</script>

<style lang="less" scoped>
main {
  display: flex;
  height: 100vh;
  cursor: pointer;
  aside {
    display: none;

    flex-direction: column;
    justify-content: space-between;
    padding: 60px;
    color: #fff;

    background-image: linear-gradient(rgb(76, 150, 185), rgb(167, 171, 172));

    div:first-child {
      font-size: 25px;
    }
    div:last-child {
      font-size: 60px;
      .baseline {
        display: flex;
        span {
          display: block;
          width: 100px;
          height: 10px;
          background-color: #fff;
          margin-top: 10px;
          margin-right: 20px;
          opacity: 0.5;
        }
      }
    }
  }
  section {
    position: relative;
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-form {
      .tips {
        margin-bottom: 40px;
        font-size: 20px !important;
        font-weight: bold;
        color: #4e97b9;
      }
      .el-button {
        background-color: #4e97b9;
        color: #fff;
      }
    }
  }
}

@media screen and (min-width: 992px) {
  main aside {
    display: flex;
    width: 60%;
  }
  main section {
    width: 40%;
  }
}
</style>
