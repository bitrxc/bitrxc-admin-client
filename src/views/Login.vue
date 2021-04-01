<template>
  <div class="login-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <!-- 显示背景图片 -->
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-form
          class="login-form"
          v-bind:model="loginForm"
          v-bind:rules="loginFormRules"
          ref="loginFormRef"
        >
          <div class="title">Hello</div>
          <div class="title-tips">{{ titleTips }}</div>
          <el-form-item class="form-item" prop="username">
            <el-input
              placeholder="请输入用户名"
              type="text"
              prefix-icon="el-icon-user"
              v-model="loginForm.username"
            >
            </el-input>
          </el-form-item>
          <el-form-item class="form-item" prop="password">
            <el-input
              placeholder="请输入密码"
              type="password"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="login">
              登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="reset-btn" type="info" @click="resetLoginForm">
              重置
            </el-button>
          </el-form-item>
          <!-- <router-link to="register">
            <div style="margin-top: 20px">注册</div>
          </router-link> -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { loginRequest } from "../network/login";
import { reqSuccess, reqError } from "../utils/tips";
export default {
  name: "Login",
  data() {
    return {
      titleTips: "睿信书院管理系统",
      loginForm: {
        username: "admin",
        password: "admin"
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度为 3-10", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 12, message: "长度为 5-12", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录
    login() {
      // 登陆前的校验
      this.$refs.loginFormRef.validate(async valid => {
        // 验证失败直接返回
        if (valid === false) {
          return;
        }

        loginRequest(this.loginForm)
          .then(result => {
            // 可以发送网络请求
            console.log(result);
            const res = result.data;

            if (res.code !== 200) {
              return reqError("用户名或密码错误");
            }

            // 保存 token 到 sessionStorage
            console.log(res.data.token);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem(
              "userInfo",
              JSON.stringify(res.data.userInfo)
            );

            reqSuccess("登录成功");
            this.$router.push("/home");
          })
          .catch(err => {
            console.log(err);
            return reqError("网络故障");
          });
      });
    },
    // 重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  /* 背景图片铺满屏幕, 且不随界面滑动而改变 */
  background: url("../assets/img/background.jpg") center no-repeat fixed;
  background-size: cover;

  .login-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 500px) / 2) 10% 10%;
    overflow: hidden;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);

      /* 如果文本溢出, 显示省略符号来代表被修剪的文本 */
      text-overflow: ellipsis;
      /* 文本不换行 */
      white-space: nowrap;
    }

    .form-item {
      margin-top: 40px;
    }

    .login-btn,
    .reset-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
    }
  }
}
</style>
