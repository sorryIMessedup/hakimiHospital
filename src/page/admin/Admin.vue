<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-black fixed-top topnav">
      <div class="container">
        <a class="navbar-brand" href='/home'><i class="fas  mr-2"></i><img src="@/assets/logo.png" style="width: 45px;" alt="" />
          <span style="font-size: 30px;">&nbsp;&nbsp;虚拟宠物医院学习后台</span>
        </a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown-1" aria-controls="navbarNavDropdown-1" aria-expanded="false" aria-label="Toggle navigation" style=""><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown-1">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active"><a class="nav-link" @click="$router.push('/admin/mainpage')">主页<span class="sr-only">(current)</span></a></li>
            <li class="nav-item"><a class="nav-link" @click="$router.push('/admin/user')">用户管理</a></li>
            <li class="nav-item"><a class="nav-link" @click="$router.push('/admin/test_management')">问题管理</a></li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" @click="toggleDropdown">
                基本功能管理
              </a>
              <div class="dropdown-menu" :class="{ show: isDropdownOpen }" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" @click="$router.push('/admin/department');isDropdownOpen=false;">科室管理</a>
                <a class="dropdown-item" @click="$router.push('/admin/medicine');isDropdownOpen=false;">药品管理</a>
                <a class="dropdown-item" @click="$router.push('/admin/charge');isDropdownOpen=false;">收费管理</a>
                <a class="dropdown-item" @click="$router.push('/admin/vaccinum');isDropdownOpen=false;">疫苗管理</a>
                <a class="dropdown-item" @click="$router.push('/admin/assay');isDropdownOpen=false;">化验项目管理</a>
                <a class="dropdown-item" @click="$router.push('/admin/staff');isDropdownOpen=false;">人员管理</a>
                <a class="dropdown-item" @click="$router.push('/admin/record');isDropdownOpen=false;">档案管理</a>
                <a class="dropdown-item" @click="$router.push('/admin/inpatient');isDropdownOpen=false;">住院管理</a>

              </div>
            </li>
            <li class="nav-item"><a class="nav-link" @click="$router.push('/admin/disease_list')">疾病与病类管理</a></li>


          </ul>
          <ul class="navbar-nav ml-auto d-flex align-items-center">
            <li class="nav-item">
   <span class="nav-link" href="#">
   <a class="btn btn-info btn-round shadow" @click="logout" data-toggle="modal" data-target="#modal_newsletter"><i class="fas fa-cloud-download-alt"></i>退出登录</a>

   </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="hospital_admin-page">
      <router-view></router-view>
    </div>

    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1440 126" style="enable-background:new 0 0 1440 126;" xml:space="preserve">
<path class="bg-light" d="M685.6,38.8C418.7-11.1,170.2,9.9,0,30v96h1440V30C1252.7,52.2,1010,99.4,685.6,38.8z"></path>
</svg>
    <footer class="bg-light pb-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md mr-4">
            <i class="fas fa-copyright text-grey"></i>
            <small class="d-block mt-3 mb-3 text-muted">© 2024 G14A&amp;B作业</small>
          </div>
          <div class="col-6 col-md">
            <h5 class="mb-4 text-grey">Features</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Cool stuff</a></li>

            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="mb-4 text-grey">Resources</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" @click="$router.push('/home/case_list')">Resource</a></li>

            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="mb-4 text-grey">Utilities</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="https://www.ecnu.edu.cn">Education</a></li>

            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="mb-4 text-grey">About</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="https://github.com/Yemiaojun/pet114">Backend Team</a></li>
              <li><a class="text-muted" href="https://github.com/sorryIMessedup/hakimiHospital">Frontend Team</a></li>

            </ul>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import { NetLoader } from '@/net';
import '../../js/functions'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Admin",
  data() {
    return {
      isDropdownOpen: false,
      loader: new NetLoader("test"),
      username: "default"
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen; // 每次点击时取反布尔值
    },
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


    // this.$notify({
    //    title: '恭喜你登陆成功',
    //    message: '这是一条登录成功的提示消息，现在请你好好体验管理员功能吧',
    //    type: 'success'
    // });

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


  background-position: center center;
  background-repeat: repeat;
  background-size: 100%;
}

.nav {
  min-height: 90px;

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