<template>
<div>
  <div>
    <div class="jumbotron jumbotron-lg jumbotron-fluid mb-0 pb-3 bg-primary position-relative">
      <div class="container-fluid text-white h-100">
        <div class="d-lg-flex align-items-center justify-content-between text-center pl-lg-5">
          <div class="col pt-4 pb-4">
            <h1 class="display-3">有着最全资料的宠物医院学习系统 </h1>
            <h5 class="font-weight-light mb-4">免费版1.0</h5>
            <a href="#" class="btn btn-lg btn-outline-white btn-round">Learn more</a>
          </div>
          <div class="col align-self-bottom align-items-right text-right">
            <img src="../../assets/img/2.png" class="rounded img-fluid">
          </div>
        </div>
      </div>
    </div>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1440 126" style="enable-background:new 0 0 1440 126;" xml:space="preserve">
  <path class="bg-primary" d="M685.6,87.2C418.7,136.1,170.2,116.1,0,96v-96h1440v96C1252.7,73.8,1010,26.6,685.6,87.2z"></path>
</svg>




</div>
  <br><br><br><br><br><br><br><br><br><br><br>
  <div class="container" data-aos="fade-up">

    <div class="row">
    <div class="col-md-3">
      <div class="card shadow-sm border-0">
        <img class="card-img-top" src="../../assets/img/3.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">病例学习</h5>
          <p class="card-text text-muted">
            在这个模块你可以通过看到不同疾病和对应的病例，并从中获取知识。
          </p>
          <a @click="$router.push('/home/case_list')"  class="btn btn-info btn-round">进入学习</a>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm border-0">
        <img class="card-img-top" src="../../assets/img/4.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">角色扮演</h5>
          <p class="card-text text-muted">
            在这个模块你可以体验不同角色在宠物医院工作的一天。
          </p>
          <a @click="$router.push('/home/role')"   class="btn btn-info btn-round">进入学习</a>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm border-0">
        <img class="card-img-top" src="../../assets/img/5.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">参加考试</h5>
          <p class="card-text text-muted">
            在这个你模块你可以参加管理员给你布置的考试
          </p>
          <a @click="$router.push('/home/exams')"   class="btn btn-info btn-round">进入学习</a>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="card shadow-sm border-0">
        <img class="card-img-top" src="../../assets/img/6.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">浏览医院</h5>
          <p class="card-text text-muted">
            在这个你模块你可以浏览2D和3D的医院地图
          </p>
          <a @click="$router.push('/home/exams')"   class="btn btn-info btn-round">进入查看</a>
        </div>
      </div>
    </div>
    </div>

  </div>

</div>


</template>

<script>
import '../../css/vendor/aos.css'
import AOS from '../../js/vendor/aos'
export default {
	// eslint-disable-next-line vue/multi-word-component-names
	name: "Main",
	data() {
		return { };
	},
	methods: {},
  mounted() {



    AOS.init({ duration: 1000 });
    AOS.refresh();
    console.log("大妈能不能好了")


  },


};

</script>

<style lang="less" scoped>
.hospital_main-container {
	position: relative;
	height: calc(100vh - 100px);
	padding-top: 100px;

  background-position: center center;
  background-repeat: repeat;
  background-size: cover;

	.el-card {
		margin-left: 20px;
		margin-right: 20px;
		height: 180px;
	}

	.item {
		height: width;
		text-align: center;
	}

	svg {
		width: 60px;
		height: 60px;
		margin-bottom: 10px;
	}

	h1 {
		position: relative;
		font-size: 25px;
		text-align: center;
	}

	.hospital_main-logo {
		backdrop-filter: blur(8px);
		padding: 10px;
		box-sizing: border-box;
		margin-bottom: 80px;

		img {
			padding-top: 20px;
			display: block;
			margin: 0px auto;
			width: 100px;
			height: auto;
		}

		.hospital_main-title {
			text-align: center;
			font-size: 35px;
			font-weight: 600;
			margin-top: 10px;
		}
	}
}
</style>