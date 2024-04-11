<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <el-card>
      <h1 style="padding-bottom: 20px; padding-left: 10px;">新用户注册</h1>
      <el-form label-position="left" label-width="80px" :model="formLabelAlign" style="padding-left: 10px;">
        <el-form-item label="用户名">
          <el-input v-model="formLabelAlign.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formLabelAlign.confirmedPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formLabelAlign.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密保问题">
          <el-select v-model="formLabelAlign.questions" placeholder="请选择密保问题">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密保答案">
          <el-input v-model="formLabelAlign.answer" placeholder="请输入密保答案"></el-input>
        </el-form-item>
      </el-form>

      <div class="hospital_register-button">
        <div class="button" @click="register">注册</div>
        &nbsp;&nbsp;
        <div class="button" @click="quit">返回</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { NetLoader } from '@/net';
export default {
  data() {
    return {
      loader: new NetLoader("test"),
      formLabelAlign: {
        username: '',
        password: '',
        confirmedPassword: '',
        email: '',
        questions: '',
        answer: ''
      }
    }
  },
  methods: {
    register() {
      this.loader.post("/users/register", {
        username: this.formLabelAlign.username,
        password: this.formLabelAlign.password,
        confirmPassword: this.formLabelAlign.confirmedPassword,
        email: this.formLabelAlign.email,
        securityQuestion: this.formLabelAlign.questions,
        securityQuestionAnswer: this.formLabelAlign.answer,
      }).then(val => {
        console.log(val);
        if (val.status == 200) {
          this.$message.success('注册成功');
          this.$router.push("/login");
        } else {
          this.$message.error('注册失败');
        }
      }, err => {
        this.$message.error('注册失败');
        console.log(err);
      })
    },
    quit() {
      this.$router.push("/login");
    }
  }
}
</script>

<style>
.container {
  background-color: rgba(220, 220, 220);
  width: 100vw;
  height: 100vh;
  margin: 0px;
  min-width: 900px;
}

.el-card {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 600px;
}

.el-input {
  width: 40vw;
}

.hospital_register-button {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;

  .button {
    width: 80%;
    padding: 10px 0px;
    background: rgba(40, 40, 40);
    color: #fff;
    font-size: 14px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
  }
}
</style>