<template>
  <div class="parent-container">
    <div class="jumbotron jumbotron-lg jumbotron-fluid mb-0 pb-3 bg-primary position-relative">
      <div class="container-fluid text-white h-100">
        <div class="d-lg-flex align-items-center justify-content-between text-center pl-lg-5">
          <div class="col pt-4 pb-4">
            <h1 class="display-3">{{activity.name}}要怎么做？</h1>
          </div>
        </div>
      </div>
    </div>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1440 126" style="enable-background:new 0 0 1440 126;" xml:space="preserve">
  <path class="bg-primary" d="M685.6,87.2C418.7,136.1,170.2,116.1,0,96v-96h1440v96C1252.7,73.8,1010,26.6,685.6,87.2z"></path>
</svg>
    <br><br> <br><br> <br><br> <br><br> <br><br> <br><br>
    <div class="container" data-aos="fade-up">
    <div class="video-container">
      <video :src="videoUrl" controls loop class="video"></video>
    </div>
      </div>
      <br><br><br><br><br><br>

      <div class="procedure-box" data-aos="fade-up">
        <div class="hospital_roleDetail-header">
          <div class="leftIcon" @click="handleLeftClick">
            <svg t="1681532876605" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1058" width="32" height="32"><path d="M926 512.735C926 571.424 878.424 619 819.735 619h-248.47C512.576 619 465 571.424 465 512.735v-0.47C465 453.576 512.576 406 571.265 406h248.47C878.424 406 926 453.576 926 512.265v0.47z" fill="#666666" p-id="1059"></path><path d="M393.253 211.526l-20.039 16.782-123.556 103.274L207 367.183v0.145l-39.684 33.48-25.064 21.12c-22.134 18.592-35.922 41.499-41.51 65.496-5.388 23.137-3.028 47.277 6.944 69.558 7.388 16.509 18.961 32.002 34.772 45.283l20.973 17.595a126.607 126.607 0 0 0 3.903 3.42l40.138 33.612 42.422 35.526 118.205 99.202a133.348 133.348 0 0 0 5.115 4.072l20.039 16.782c36.111 30.193 79.632 36.734 116.905 22.18 24.035-9.384 45.478-27.516 60.637-53.813l2.168-3.765c5.847-12.988 9.483-27.541 10.548-43.261l0.454 0.442s-41.796-154.376-41.796-222.16 41.7-212.588 41.7-212.588c-0.035-19.327-3.918-37.061-10.907-52.586l-2.168-3.765c-14.4-24.98-34.475-42.577-57.051-52.322a110.188 110.188 0 0 0-3.585-1.492c-37.273-14.552-80.794-8.011-116.905 22.182z" fill="#666666" p-id="1060"></path></svg>
          </div>
          <div class="hospital_roleDetail-title">{{ activity.name }}</div>
          <div class="rightIcon" @click="handleRightClick">
            <svg t="1681532837958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="903" width="32" height="32"><path d="M560 512.414C560 453.643 512.357 406 453.586 406H204.414C145.643 406 98 453.643 98 512.414v0.172C98 571.357 145.643 619 204.414 619h249.172C512.357 619 560 571.357 560 512.586v-0.172z" fill="#666666" p-id="904"></path><path d="M630.024 211.105l20.067 16.805 124.46 103.419L818 366.98v0.146l39.008 33.527 24.734 21.15c22.165 18.618 35.789 41.557 41.386 65.588 5.395 23.169 2.94 47.343-7.045 69.656-7.398 16.532-19.033 32.047-34.867 45.347l-21.025 17.62a128.674 128.674 0 0 1-3.92 3.425l-40.2 33.659-42.484 35.575-118.372 99.341a133.759 133.759 0 0 1-5.123 4.078l-20.068 16.805c-36.162 30.236-79.744 36.785-117.069 22.211-24.069-9.397-45.542-27.555-60.722-53.889l-2.171-3.77c-5.856-13.007-9.497-27.58-10.563-43.322l-0.455 0.443s41.854-154.592 41.854-222.471-41.758-212.887-41.758-212.887c0.035-19.354 3.923-37.113 10.923-52.66l2.171-3.77c14.42-25.015 34.524-42.636 57.131-52.395a112.775 112.775 0 0 1 3.59-1.494c37.325-14.574 80.907-8.024 117.069 22.212z" fill="#666666" p-id="905"></path></svg>
          </div>
        </div>
        <div class="hospital_roleDetail-main">
          <RoleProgress v-if="progress" :progress="progress"/>
        </div>
      </div>
    <br><br><br><br><br><br>

  </div>
</template>

<script>
import {roles} from "./roles"
import RoleNav from "@/component/RoleNav.vue"
import RoleProgress from "@/component/RoleProgress.vue"
import {NetLoader} from "@/net";
import '../../css/vendor/aos.css'
import AOS from '../../js/vendor/aos'
    export default {
        components: {
            RoleNav,RoleProgress
        },
        data() {
            return {
                loader: new NetLoader("test"),
                knowledge: null,
                progress: null,
                index: 0,
                enum: [],
                title: "",
                videoUrl: null,
                activity:{
                  avatar : ""
                },
                activities : []

            }
        },
        methods: {
            handleLeftClick() {
                console.log("click left")
                if(this.index > 0) this.index--
                this.activity = this.enum[this.index]
                this.reloadResources()
            },
            handleRightClick() {
                console.log("click right")
                if(this.index < this.enum.length-1) this.index++;
                this.activity = this.enum[this.index]
                this.reloadResources()
            },
          reloadResources(){
            const activityId = this.activity.id
            console.log(this.activity)
            const avatarId = this.activity.avatar
            this.videoUrl = "files/findFileById?id=" + avatarId
            console.log("viedourl是"+this.videoUrl)

            this.loader.get("procedure/findProceduresByActivityId?id="+activityId).then(value => {
              this.progress = value.data.data
              console.log(this.progress)
            })
          }
        },
        beforeRouteLeave(from,to,next) {
            // 销毁组件
            this.$destroy();
            next();
        },
      created() {
        let role = this.$router.currentRoute.query.role;

        this.loader.get("role/findRoleByName?name=" + role).then(value => {
          const jsonData = value.data;
          let id = jsonData.data.id

          this.loader.get("activity/findActivitiesByRoleId?id="+id).then(value => {
            const jsonData = value.data;
            let activityList = jsonData.data
            this.enum = activityList
            this.title = this.enum[this.index].name;
            this.activity = this.enum[this.index]
            const activityId = this.activity.id
            console.log(this.activity)
            const avatarId = this.activity.avatar
            this.videoUrl = "files/findFileById?id=" + avatarId
            console.log("viedourl是"+this.videoUrl)

            this.loader.get("procedure/findProceduresByActivityId?id="+activityId).then(value => {
              this.progress = value.data.data
              console.log(this.progress)
            })
          })
        })
      },
      mounted() {
        AOS.init({ duration: 1000 });
        AOS.refresh();
      },


        watch: {
            index(newVal) {
                this.progress = this.knowledge[this.enum[newVal]];
                this.title = this.enum[newVal];     
                this.videoUrl = this.activity.videoUrlList[0];
            }
        }
    }
</script>

<style lang="less" scoped>

        .hospital_roleDetail-header {
            padding: 0 10px;
            display: flex;

            .leftIcon .rightIcon {
                width: 30px;
                text-align: center;
                cursor: pointer;
            }

            .hospital_roleDetail-title {
                flex-grow: 1;
                text-align: center;
                font-size: 23px;
                font-weight: 600;
            }
        }

    .hospital_roleDetail-rightContainer {
        flex: 1;
        margin-left: 15px;
        padding: 10px;
        height: 600px;
        overflow-y: scroll;
        box-sizing: border-box;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        .title {
            font-size: 23px;
            font-weight: 600;
            margin-bottom: 15px;
        }








    
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 设置容器高度为视口高度，可以根据实际情况调整 */
}

.video-container {
  width: 90%; /* 设置.video-container占屏幕宽度的90% */
  margin: 0 auto; /* 居中显示 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 8px; /* 可选：添加圆角效果 */
  overflow: hidden;
  display: flex; /* 使用Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 80% /* 或者根据需要设置一个具体的高度 */
}

.video {
  width: 80%; /* 设置.video占.video-container宽度的80% */
  height: auto; /* 高度自适应 */
}
.procedure-box{
  width: 80%; /* 设置.video-container占屏幕宽度的90% */
  margin: 0 auto; /* 居中显示 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 8px; /* 可选：添加圆角效果 */
  overflow: hidden;



  height: auto
}

        .hospital_roleDetail-header {
          display: flex; /* 启用Flexbox布局 */
          justify-content: center; /* 将子元素居中对齐 */
          align-items: center; /* 垂直居中 */
        }

        .leftIcon, .rightIcon {
          margin: 0 10px; /* 在左右图标与标题之间添加一些间距 */
        }

</style>