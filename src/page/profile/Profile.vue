

<template>
<div class="table-wrapper">
  <br><br><br><br><br><br>
  <!-- Author Card -->
  <div class="card shadow-sm border-0 table-shadow" data-aos="fade-up">
    <img class="card-img-top" src="../../assets/img/8.jpg" alt="Card image cap">
    <div class="card-body text-center">

      <img
          id="userAvatar"
          class="rounded-circle shadow mt-neg5"
          :src="'users/getCurrentAvatar'"
          @error="errorHandler"
          @click="triggerFileInput"
          width="70"
          v-show="showUserAvatar"
      >
      <img
          id="defaultAvatar"
          class="rounded-circle shadow mt-neg5"
          src="@/assets/img/10.png"
          @click="triggerFileInput"
          width="70"
          v-show="!showUserAvatar"
      >
      <input
          type="file"
          id="fileInput"
          ref="fileInput"
          style="display: none"
          @change="uploadAvatar"
      >

      <h5 class="card-title">{{user.username}}</h5>
      <p class="card-text text-muted">
        你好，亲爱的{{user.auth}}
      </p>
      <div class="text-center">
        <a target="_blank" href="#"><span class="iconbox iconsmall rounded-circle bg-secondary text-white mr-1"><i class="fab fa-facebook-f"></i></span></a>
        <a target="_blank" href="#"><span class="iconbox iconsmall rounded-circle bg-info text-white mr-1"><i class="fab fa-twitter"></i></span></a>
        <a target="_blank" href="#"><span class="iconbox iconsmall rounded-circle bg-dark text-white"><i class="fab fa-github"></i></span></a>
      </div>
    </div>
  </div>
</div>
</template>



<script >
import { NetLoader } from "@/net";
import { NetLoader2 } from "@/net";
import '../../css/vendor/aos.css'
import AOS from '../../js/vendor/aos'
export default {
  data(){
    return{
      loader: new NetLoader("test"),
      showUserAvatar: true,
      user : {},

    }
  },
  methods:{
    triggerFileInput() {
      // 触发文件输入
      this.$refs.fileInput.click();
    },
    uploadAvatar(event) {

      const file = event.target.files[0];
      console.log("选择的文件是：", file);
      if (!file) {
        return;
      }


      const formData = new FormData();
      formData.append('file', file);


      // 使用axios发送POST请求上传文件
      this.loader.post('users/uploadAvatar',formData)
          .then(response => {
            // 上传成功后更新头像URL
            this.showUserAvatar = true;
          })
          .catch(error => {
            console.error("上传失败", error);
            // 处理错误情况
          });
    },
    errorHandler(event) {
      // 设置为本地图像路径
      this.showUserAvatar = false;
      console.log("用户头像不存在")
    },
    getData(){
      this.loader.get("users/findCurrentUser").then(value => {
        this.user = value.data.data
        // 获取<img>元素
        this.user.auth = (this.user.auth==2)? "管理员":"实习生";

      })
    }
  },
  created() {
    this.getData()
    const avatarImg = document.getElementById('userAvatar');
    avatarImg.src = '../../assets/img/8.jpg';
  },
  mounted() {



    AOS.init({ duration: 1000 });
    AOS.refresh();


  },
}
</script>


<style scoped lang="less">
.table-wrapper {
  padding: 0 200px; /* 在左右两侧留出相同的空白 */

}
.table-shadow{
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 8px; /* 可选：添加圆角效果 */
  overflow: hidden; /* 防止阴影被裁剪 */
}
</style>