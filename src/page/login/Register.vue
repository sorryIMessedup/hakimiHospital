<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <el-card>
      <h1 style="padding-bottom: 10px; padding-left: 10px;">新用户注册</h1>
      <p style="padding-left: 10px; padding-bottom: 20px;">
        新注册的用户都会被作为实习生注册。<br>
        如果你需要成为管理员，请联系超级管理员。
      </p>
      <el-form :rules="rules" label-position="left" label-width="80px" :model="formLabelAlign" style="padding-left: 10px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLabelAlign.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmedPassword">
          <el-input v-model="formLabelAlign.confirmedPassword" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密保问题" prop="question">
          <el-select v-model="formLabelAlign.questions" placeholder="请选择密保问题">
            <el-option label="你就读的学校是什么？" value="你就读的学校是什么？"></el-option>
            <el-option label="你最印象深刻的人是谁？" value="你最印象深刻的人是谁？"></el-option>
            <el-option label="你的宠物名字是什么？" value="你的宠物名字是什么？"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密保答案" prop="answer">
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
      },
      rules: {
        username: [{required: true , message: '请输入用户名', trigger: 'blur'},
                   {min: 2, message: '长度至少为2个字符', trigger:'blur'} ],
        password: [ {required: true, message: '请输入密码',  trigger:'blur'},
                    {min: 6, message: '长度至少为6个字符且包含字母', trigger:'blur'} ],
        confirmedPassword: [ {required: true, message: '请输入确认密码', trigger:'blur'} ]
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
          this.$message.error(val.data.data.message);
        }
      }, err => {
        this.$message.error(err.response.data.message);
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
  background-image: url("@/assets/main/bg.jpg");
  background-position: center center;
  background-repeat: repeat;
  background-size: cover;

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