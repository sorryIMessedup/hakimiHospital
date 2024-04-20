<template>
  <div>
    <!-- header with nav -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top topnav">
      <div class="container">
        <a class="navbar-brand" href="#"><i class="fas fa-anchor mr-2"></i><img src="@/assets/logo.png" style="width: 45px;" alt="" />
          <span style="font-size: 30px;">&nbsp;&nbsp;虚拟宠物医院学习系统</span>
        </a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown-1" aria-controls="navbarNavDropdown-1" aria-expanded="false" aria-label="Toggle navigation" style=""><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown-1">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active"><a class="nav-link" @click="$router.push('/home')">主页<span class="sr-only">(current)</span></a></li>
            <li class="nav-item"><a class="nav-link" href="#">充值会员</a></li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" @click="toggleDropdown">
                更多功能
              </a>
              <div class="dropdown-menu" :class="{ show: isDropdownOpen }" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" @click="$router.push('/detail?room=手术室');isDropdownOpen=false;">医院2d导览</a>
                <a class="dropdown-item" @click="$router.push('/vr');isDropdownOpen=false;">医院VR导览</a>
                <a class="dropdown-item" @click="$router.push('/home/case_list');isDropdownOpen=false;">病例查阅</a>
                <a class="dropdown-item" @click="$router.push('/home/role');isDropdownOpen=false;">角色扮演</a>
                <a class="dropdown-item" @click="$router.push('/home/exams');isDropdownOpen=false;">参与考试</a>
              </div>
            </li>
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


    <el-container >

		<el-breadcrumb separator-class="el-icon-arrow-right" class="nav-path" style="margin-top: 70px; margin-left: 10px"
			v-if="$router.currentRoute.path !== '/home/main'">
			<el-breadcrumb-item v-for="(item, index) in $store.state.path" :key="index" :to="{ path: item.to }">{{
					item.name }}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-main>
			<router-view> </router-view>
		</el-main>
	</el-container>
    <br><br><br><br><br><br>
    <!-- dark footer -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1440 126" style="enable-background:new 0 0 1440 126;" xml:space="preserve">
<path class="bg-black" d="M685.6,38.8C418.7-11.1,170.2,9.9,0,30v96h1440V30C1252.7,52.2,1010,99.4,685.6,38.8z"></path>
</svg>
    <footer class="bg-black pb-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md mr-4">
            <i class="fas fa-copyright text-white"></i>
            <small class="d-block mt-3 mb-3 text-muted">© 2024 G14A&amp;B作业</small>
          </div>
          <div class="col-6 col-md">
            <h5 class="mb-4 text-white">Features</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="#">Cool stuff</a></li>

            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="mb-4 text-white">Resources</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" @click="$router.push('/home/case_list')">Resource</a></li>

            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="mb-4 text-white">Utilities</h5>
            <ul class="list-unstyled text-small">
              <li><a class="text-muted" href="https://www.ecnu.edu.cn">Education</a></li>

            </ul>
          </div>
          <div class="col-6 col-md">
            <h5 class="mb-4 text-white">About</h5>
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
<script src="./assets/js/vendor/aos.js" type="text/javascript">

</script>
<script>
import { NetLoader } from "@/net";
import '../../css/main.css'
import '../../js/functions'



import '../../css/vendor/aos.css'


export default {
	// eslint-disable-next-line vue/multi-word-component-names

	name: "Home",
	components: { },
	data() {
		return {
			loader: new NetLoader("test"),
			username: "test1",
			showItemList: false,
			showUserInfo: false,
      isDropdownOpen: false
		};
	},
	methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen; // 每次点击时取反布尔值
    },
		toggleUserInfo() {
			this.showUserInfo = !this.showUserInfo;
		},
		logout() {
			this.loader.post("/users/logout").then(() => {
				window.localStorage.removeItem("token");
				this.$store.commit("changeStatus", 0);
				this.showUserInfo = false;
				this.$message({
					message: "退出账号成功",
					type: "success",
				});
				this.$router.push("/login");
			});
		},
	},
	created() {
		if (window.localStorage.getItem("token")) {
			//TODO 此处需要发送请求来验证该token的具体身份方便在导航栏出展示用户名和用户的信息
			this.loader.get("/users/verify").then(
				(value) => {
					this.username = value.data.userName;
					let type = value.data.type;
					if (type === "user") {
						this.$message({
							message: "恭喜你，登陆成功",
							type: "success",
						});
						this.$store.commit("changeStatus", 1);
					} else if (type === "admin") {
						this.$store.commit("changeStatus", 1);
					}
					this.$store.commit("changeType", type);
				},
				(err) => {
					console.log(err);
					this.$store.commit("changeStatus", 0);
				}
			);
		}
	},
	mounted() {

		this.$refs.guide.addEventListener("mouseenter", () => {
			this.showItemList = true;
      this.isDropdownOpen = false;
		});

		this.$refs.guide.addEventListener("mouseleave", () => {
			this.showItemList = false;
		});


      AOS.init({ duration: 700 });
      AOS.refresh();
      console.log("大妈能不能好了")


	},
};
</script>

<style lang="less" scoped>

*[data-aos] {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.nav {
	min-width: 900px;
	min-height: 10px;
	background: rgba(66, 66, 66);
	position: absolute;
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

.el-main {
	padding: 0 !important;
}
</style>
