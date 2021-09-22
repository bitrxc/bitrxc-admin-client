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
      <div id="form">
        <div>管理员登入</div>
        <el-input placeholder="请输入用户名"  v-model="userForm.username"  class="input">
          <template #prefix><i class="el-icon-user"></i></template>
        </el-input>
        <el-input type="password" placeholder="请输入密码"  v-model="userForm.password"  class="input">
          <template #prefix><i class="el-icon-lock"></i></template>
        </el-input>
        <button @click="handleLogin">登录</button>
      </div>
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
      console.log(res)
    }

    return {
      userForm,
      handleLogin
    }
  }
}
</script>

<style lang="less">
main {
  display: flex;
  height: 100vh;
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

    #form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      div {
        float: right;
        margin: 50px 0;
        color: #4e97b9;
        font-size: 25px;
        font-weight: bold;
      }

      .input {
        font-size: 16px;
        margin: 10px 0;
      }

      button {
        width: 100px;
        height: 40px;
        margin: 50px;
        border: none;
        border-radius: 20px;
        outline: none;
        color: #fff;
        font-size: 20px;
        background-color: #4e97b9;
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
