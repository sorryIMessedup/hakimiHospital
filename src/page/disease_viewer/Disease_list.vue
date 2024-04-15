<template>
  <div id="case_list">
    <div class="case_list-container" v-if="this.token != 0">
      <div>
        <Case_group v-for="item in category" :key="item.id" :disease_group="item.name" :disease_groupid="item.id"
          :disease_data="disease_data" />
      </div>
      <div style="">
        
      </div>
    </div>
    <div v-else>
      <el-empty description="您暂未登录，无法查看病例信息"></el-empty>
    </div>
  </div>
</template>

<script>
import Case_group from '@/component/Case_group.vue';
import { NetLoader } from '@/net';
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
  components: { Case_group },
}
</script>

<style scoped lang="less">
#case_list {
  display: flex;
  width: 100vh;
  height: wrap-content;
  margin: 0;
  margin-left: 2%;
  margin-top: 30px;

  .case_list-container {
    display: flex;
  }
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>