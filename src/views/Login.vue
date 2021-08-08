<template>
  <main>
    <aside>
      <div>
        <span>北京理工大学</span>
        <div class="top baseline"><span></span></div>
      </div>
      <div>
        <span>
          睿信社区管理系统
        </span>
        <div class="bottom baseline">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </aside>
    <section>
      <div id="form">
        <div>管理员登入</div>
        <a-input
          placeholder="请输入用户名"
          v-model:value="loginData.username"
          class="b-input"
        >
          <template #prefix>
            <user-outlined type="user" style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
        <a-input
          type="password"
          placeholder="请输入密码"
          v-model:value="loginData.password"
          class="b-input"
        >
          <template #prefix>
            <lock-outlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
        <button @click="handleLogin">登录</button>
      </div>
    </section>
  </main>
</template>

<script>
import { login } from "@/api/login.js";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default {
  components: {
    UserOutlined,
    LockOutlined
  },
  data() {
    return {
      loginData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      const res = await login(this.loginData);
      const token = res.data.data.token;
      window.localStorage.setItem("token", token);
      this.$router.replace("/");
    }
  }
};
</script>

<style>
main {
  display: flex;
  height: 100vh;
  background: url("../assets/img/background.png") repeat;
}

/* aside 部分 */
main aside {
  display: none;

  flex-direction: column;
  justify-content: space-between;
  padding: 60px;
  color: #fff;
}
main aside div:first-child {
  font-size: 25px;
}
main aside div:last-child {
  font-size: 60px;
}
main aside div .baseline {
  display: flex;
}
main aside div .baseline span {
  display: block;
  width: 80px;
  height: 8px;
  background-color: #fff;
}
.top span {
  margin: 10px 0;
}
.bottom span {
  margin: 15px 30px;
  opacity: 0.5;
}
.bottom span:first-child {
  opacity: 1;
}

/* section 部分 */
main section {
  position: relative;
  width: 100%;
  background-color: #fff;
}
main section #form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
main section #form div {
  float: right;
  margin: 50px 0;
  color: #078aae;
  font-size: 25px;
  font-weight: bold;
}
main section #form .b-input {
  margin: 10px 0;
  border: none;
  border-bottom: 1px solid #ccc;
}
main section #form button {
  width: 100px;
  height: 40px;
  margin: 50px;
  border: none;
  border-radius: 20px;
  outline: none;
  color: #fff;
  font-size: 20px;
  background-color: #078aae;
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
