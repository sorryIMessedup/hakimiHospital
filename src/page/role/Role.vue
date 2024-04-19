<template xmlns="http://www.w3.org/1999/html">
<div>
  <div class="jumbotron jumbotron-lg jumbotron-fluid jumbotron-lg-withnav mb-3 bg-primary position-relative">
    <div class="container text-white h-100 tofront">
      <div class="row align-items-center justify-content-center text-center">
        <div class="col-md-10">
          <h1 class="display-3">来体验角色扮演吧！</h1>
        </div>
      </div>
    </div>
  </div>

<br><br><br><br><br><br><br><br><br><br><br>
      <div class="row mb-5 justify-content-center" data-aos="fade-up">
        <div class="col-lg-6  mt-5">

          <div class="card flex-md-row mb-4 box-shadow h-xl-300">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-purple">角色扮演</strong>
              <h3 class="mb-0">
                <a class="text-dark" @click="$router.push('/home/roleDetail?role=qiantai')">前台</a>
              </h3>
              <div class="mb-1 text-muted">
                桥梁和纽带
              </div>
              <p class="card-text mb-auto">
                兽医医院前台是兽医医院的重要组成部分，承担着接待、咨询、预约、收费等重要工作。作为医院的门面，前台是医院与患主、患者之间的桥梁和纽带，承载着医院形象和服务质量的重要责任。
              </p>
              <a class="text-gray" @click="$router.push('/home/roleDetail?role=qiantai')">Continue reading</a>
            </div>
            <img class="card-img-right flex-auto d-none d-md-block" src="../../assets/role/qiantai.jpg">
          </div>

          <div class="card flex-md-row mb-4 box-shadow h-xl-300">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-purple">角色扮演</strong>
              <h3 class="mb-0">
                <a class="text-dark" @click="$router.push('/home/roleDetail?role=yizhu')">医助</a>
              </h3>
              <div class="mb-1 text-muted">
                默默的配角，但他们的作用却是不可或缺
              </div>
              <p class="card-text mb-auto">
                兽医医助是兽医医院中不可或缺的重要角色，承担着协助兽医进行诊疗、照顾患者、维护医疗环境等多项职责。他们在医院中起着极其关键的作用，为医院的正常运转和患者的顺利治疗提供了有力支持。              </p>
              <a class="text-gray" @click="$router.push('/home/roleDetail?role=qiantai')">Continue reading</a>
            </div>
            <img class="card-img-right flex-auto d-none d-md-block" src="../../assets/role/yizhu.png">
          </div>

          <div class="card flex-md-row mb-4 box-shadow h-xl-300">
            <div class="card-body d-flex flex-column align-items-start">
              <strong class="d-inline-block mb-2 text-purple">角色扮演</strong>
              <h3 class="mb-0">
                <a class="text-dark" @click="$router.push('/home/roleDetail?role=shouyi')">兽医</a>
              </h3>
              <div class="mb-1 text-muted">
                医治生命的神奇力量
              </div>
              <p class="card-text mb-auto">
                兽医是一位具备深厚兽医学知识和医疗技能的专业人士，致力于保护和维护动物的健康。他们负责诊断、治疗和预防动物的疾病和伤害，为动物提供全方位的医疗护理。              </p>
              <a class="text-gray" @click="$router.push('/home/roleDetail?role=shouyi')">Continue reading</a>
            </div>
            <img class="card-img-right flex-auto d-none d-md-block" src="../../assets/role/shouyi.png">
          </div>
        </div>
    </div>
</div>

</template>

<script>
import imgYizhu from "@/assets/role/yizhu.png"
import imgQiantai from "@/assets/role/qiantai.jpg"
import imgShouyi from "@/assets/role/shouyi.png"
import '../../css/vendor/aos.css'
import AOS from '../../js/vendor/aos'
    export default {
        name: "Role",
        data() {
            return {
                imgYizhu: imgYizhu,
                imgQiantai: imgQiantai,
                imgShouyi: imgShouyi,
            }
        },
      mounted() {



        AOS.init({ duration: 1000 });
        AOS.refresh();


      },
    }
</script>

<style lang="less" scoped>
.hospital_role-wrapper {
  .hospital_role-container {
    width: 100%; /* 设置容器宽度 */
    display: flex;
    justify-content: space-around;
    margin-top: 30px;

    .hospital_role-box {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
      width: calc((100% - 60px) / 3); /* 计算每个项目的宽度，减去间距的宽度 */
      height: 480px;
      margin-right: 30px; /* 添加右侧间距 */
      &:last-child {
        margin-right: 0; /* 最后一个项目取消右侧间距 */
      }
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      img {
        width: 100%;
        height: auto;
        display: block;
      }
      .hospital_role-info {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        font-size: 24px;
        font-weight: 600;
      }
    }
  }



}

</style>