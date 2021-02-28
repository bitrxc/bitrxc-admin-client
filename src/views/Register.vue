<template>
  <div class="register-container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <!-- 占位符被背景图片遮挡 -->
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-form class="register-form" v-model="form">
          <el-from-item class="form-item">
            <el-input
              placeholder="请输入用户名"
              type="text"
              prefix-icon="el-icon-user-solid"
              v-model="form.username"
            />
          </el-from-item>
          <el-form-item class="form-item">
            <el-input
              placeholder="请输入手机号"
              type="text"
              prefix-icon="el-icon-phone"
              v-model="form.phone"
            />
          </el-form-item>
          <el-form-item class="form-item">
            <el-input
              placeholder="请设置密码"
              type="password"
              prefix-icon="el-icon-s-promotion"
              v-model="form.password"
            />
          </el-form-item>
          <el-form-item class="form-item">
            <el-input
              placeholder="请再次输入密码"
              type="password"
              prefix-icon="el-icon-circle-check"
              v-model="form.passwordRepeat"
            />
          </el-form-item>
          <el-button class="register-btn" type="primary">
            注册
          </el-button>
          <router-link to="login">
            <div style="margin-top: 20px">登录</div>
          </router-link>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        phone: "",
        password: "",
        passwordRepeat: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.register-container {
  height: 100vh;
  /* 背景图片铺满屏幕, 且不随界面滑动而改变 */
  background: url("../assets/img/background.jpg") center no-repeat fixed;
  background-size: cover;

  .register-form {
    position: relative;
    max-width: 100%;
    margin: calc((100vh - 425px) / 2) 10% 10%;
    overflow: hidden;

    .form-item {
      margin-top: 40px;
    }

    .register-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
    }
  }
}
</style>
