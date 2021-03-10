<template>
  <div class="personal-details">
    <!-- 面包屑导航 -->
    <el-breadcrumb class="breadcrumb">
      <el-breadcrumb-item>个人信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="card">
      <div class="avatar-container">
        <img src="@/assets/img/avatar.svg" />
        <span class="name">张三</span>
        <div style="width: 80%;">
          <lay-row bgcolor="#ffffff">
            <template v-slot:title>原始密码:</template>
            <template v-slot:explain>********</template>
            <template v-slot:operation>
              <el-button type="primary" @click="dialogPasswordVisible = true">
                修改
              </el-button>
            </template>
          </lay-row>
          <lay-row bgcolor="#f5f5f5">
            <template v-slot:title>邮箱地址:</template>
            <template v-slot:explain>{{ userInfo.oldEmail }}</template>
            <template v-slot:operation>
              <el-button type="primary" @click="dialogEmailVisible = true">
                修改
              </el-button>
            </template>
          </lay-row>
          <lay-row bgcolor="#ffffff">
            <template v-slot:title>手机号码</template>
            <template v-slot:explain>{{ userInfo.oldPhone }}</template>
            <template v-slot:operation>
              <el-button type="primary" @click="dialogPhoneVisible = true">
                修改
              </el-button>
            </template>
          </lay-row>
        </div>
      </div>
    </el-card>

    <!-- 对话框区域 -->
    <div>
      <!-- 修改密码的对话框 -->
      <el-dialog
        title="修改密码"
        v-model="dialogPasswordVisible"
        v-bind:before-close="handleClose"
      >
        <el-form v-bind:model="passwordForm" v-bind:rules="passwordRules">
          <el-form-item prop="newPassword">
            <el-input
              placeholder="请输入新的密码"
              v-model="passwordForm.newPassword"
              type="password"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              placeholder="请再次确认新密码"
              v-model="passwordForm.confirmPassword"
              type="password"
            >
            </el-input>
          </el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form>
      </el-dialog>

      <!-- 修改邮箱的对话框 -->
      <el-dialog
        title="修改邮箱地址"
        v-model="dialogEmailVisible"
        v-bind:before-close="handleClose"
      >
        <el-form v-bind:model="emailForm" v-bind:rules="emailRules">
          <el-form-item prop="newEmail">
            <el-input
              placeholder="请输入新的邮箱地址"
              v-model="emailForm.newEmail"
              type="text"
            >
            </el-input>
          </el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form>
      </el-dialog>

      <!-- 修改手机号码的对话框 -->
      <el-dialog
        title="修改手机号码"
        v-model="dialogPhoneVisible"
        v-bind:before-close="handleClose"
      >
        <el-form v-bind="phoneForm" v-bind:rules="emailRules">
          <el-form-item>
            <el-input
              placeholder="请输入新的手机号码"
              v-model="phoneForm.newPhone"
              type="text"
            >
            </el-input>
          </el-form-item>
          <el-button type="primary">提交</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import LayRow from "@/components/layRow/LayRow";

export default {
  name: "PersonalDeatils",
  components: {
    LayRow
  },
  data() {
    // 自定义确认密码的校验规则
    let checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次输入新密码"));
      }
      if (value !== this.passwordForm.newPassword) {
        return callback(new Error("再次输入的密码与新密码不相同"));
      }
    };

    // 自定义邮箱的校验规则
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入新的邮箱地址"));
      }
      // 下面应该用正则表达式
    };

    // 自定义手机的校验规则
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入新的手机号码"));
      }
    };

    return {
      userInfo: {
        oldEmail: JSON.parse(window.sessionStorage.getItem("userInfo")).email,
        oldPhone: JSON.parse(window.sessionStorage.getItem("userInfo")).mobile
      },
      // 控制弹窗的变量
      dialogPasswordVisible: false,
      dialogEmailVisible: false,
      dialogPhoneVisible: false,
      // 修改密码表单
      passwordForm: {
        newPassword: "",
        confirmPassword: ""
      },
      // 修改密码表单的校验规则
      passwordRules: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度为 6-12", trigger: "blur" }
        ],
        confirmPassword: [{ validator: checkPassword, trigger: "blur" }]
      },
      // 修改邮箱表单
      emailForm: { newEmail: "" },
      emailRules: [{ validator: checkEmail, trigger: "blur" }],
      // 修改手机号码
      phoneForm: { newPhone: "" },
      PhoneRules: [{ validator: checkPhone, trigger: "blur" }]
    };
  },
  methods: {
    // 控制弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭?")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.personal-details {
  .breadcrumb {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .card {
    .avatar-container {
      padding: 20px 0;
      display: flex;
      display: -webkit-flex; /* Safari */
      flex-direction: column;
      align-items: center;

      background: #fafafa;
      > img {
        width: 80px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
      }
      .name {
        margin: 10px;
      }
    }
  }
}
</style>
