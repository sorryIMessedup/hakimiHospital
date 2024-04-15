<template>
  <el-container>
    <el-header class="nav">
      <div class="nav-left">
        <div class="nav-icon" @click="$router.push('/admin')">
          <img src="@/assets/logo.png" style="width: 45px;" alt="" />
          <span style="font-size: 30px;">&nbsp;&nbsp;虚拟宠物医院后台管理系统</span>
        </div>
      </div>
      <div class="nav-right">
        <div class="nav-right-item" >
          <span>{{ username }}</span>
        </div>
        <div class="nav-right-item" @click=logout()>
          <span>退出账号</span>
        </div>
      </div>
    </el-header>

    <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item index="/admin/user">用户管理</el-menu-item>
      <el-menu-item index="/admin/basic_structure">基本结构与功能管理</el-menu-item>
      <el-menu-item index="/admin/disease_list">病类与疾病管理</el-menu-item>
      <el-menu-item index="/admin/case_list">病例管理</el-menu-item>
      <el-menu-item index="/admin/test_management">测试管理</el-menu-item>
    </el-menu>
    <div class="hospital_admin-page">
      <router-view></router-view>
    </div>

  </el-container>
</template>

<script>
import { NetLoader } from '@/net';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Admin",
  data() {
    return {
      loader: new NetLoader("test"),
      username: "default"
    }
  },
  methods: {
    logout() {
      this.loader.post("/users/logout").then(() => {
        this.$message({
          message: "退出账号成功",
          type: "success"
        })
        window.localStorage.removeItem("token");
        this.$store.commit("changeStatus", 0);
        this.$router.push("/login");
      })
    }
  },
  created() {
    let username = window.sessionStorage.getItem("username")
    this.username = username;
  },
  mounted() {
    // this.$notify({
    //    title: '恭喜你登陆成功',
    //    message: '这是一条登录成功的提示消息，现在请你好好体验管理员功能吧',
    //    type: 'success'
    // });
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  position: fixed;
  background: rgba(84, 92, 100, 0.7);
  padding-top: 90px;
  margin-left: 0px;

  .el-menu-item {
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 10px;
    font-size: 20px;
    border-bottom: 2px solid rgba(66, 66, 66, 0.7);
  }
}

.hospital_admin-page {
  margin-top: 90px;
  height: 100%;
  margin-left: 241px;
  background-image: url("@/assets/main/bg.jpg");
  background-position: center center;
  background-repeat: repeat;
  background-size: 100%;
}

.nav {
  min-height: 90px;
  background: rgba(66, 66, 66, 1.0);
  height: 90px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;

  .nav-path {
    margin-top: 70px;
  }

  .nav-left {
    float: left;
    height: 100%;

    .nav-icon {
      cursor: pointer;
      float: left;
      margin-left: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      span {
        background: white;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 24px;
        font-weight: 600;
      }
    }
  }

  .nav-right {
    float: right;
    height: 100%;

    .nav-right-item {
      float: right;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 25px;
      cursor: pointer;
      color: #fff;
      opacity: 0.6;
      font-weight: 200;
      position: relative;

      &:hover {
        opacity: 1;
      }

      .nav-right-user {
        position: absolute;
        top: 65px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 5px;

        div {
          padding: 10px 20px;
          border-radius: 5px;

          &:hover {
            background: gray;
          }
        }
      }

      .nav-right-itemList {
        position: absolute;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 5px;

        div {
          padding: 10px 20px;
          border-radius: 5px;

          &:hover {
            background: gray;
          }
        }
      }
    }
  }
}
</style>