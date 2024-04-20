<template>
  <div>

    <div>
      <div class="jumbotron jumbotron-lg jumbotron-fluid jumbotron-lg-withnav mb-3 bg-primary position-fixed-absolute">
        <div class="container text-white h-100 tofront">
          <div class="row align-items-center justify-content-center text-center">
            <div class="col-md-10">
              <h1 class="display-3">这里将为你提供最新的疾病案例</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="case_list" data-aos="fade-up" style="justify-content: center;">
      <div>
        <Case_group v-for="item in category" :key="item.id" :disease_group="item.name" :disease_groupid="item.id"
          :disease_data="disease_data" />
      </div>
      <div>
        <Disease_selector />
      </div>
    </div>

  </div>
</template>

<script>
import Case_group from '@/component/Case_group.vue';
import Disease_selector from '@/component/Disease_selector.vue';
import { NetLoader } from '@/net';
import '../../css/vendor/aos.css'
import AOS from '../../js/vendor/aos'
export default {
  name: "Case_list",
  data() {
    return {
      category: [],
      token: 0,
      loader: new NetLoader("test"),
      disease_data: []
    };
  },
  methods: {
    navigate: function () {
      this.$router.replace('/home/disease_simulator')
    }
  },
  created() {
    this.token = window.sessionStorage.getItem("token")
    this.loader.get("/category/findAllCategories").then((val) => {
      let res = val.data.data;
      console.log(res);
      for (let item of res) {
        this.category.push(item);
      }
    });
    this.loader.get("/case/findAllCases").then((val) => {
      let res = val.data.data;
      console.log(res);
      for (let item of res) {
        this.disease_data.push(item);
      }
    });
  },
  mounted() {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  },
  components: { Disease_selector, Case_group },
}
</script>

<style scoped lang="less">
#case_list {
  display: flex;
  height: wrap-content;
  margin: 0;
  margin-left: 2%;
  margin-top: 30px;

  .case_list-container {
    display: flex;
    justify-content: center;
  }
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>