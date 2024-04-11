<template>
  <div id="disease_list">
    <Disease_group v-for="item in categories" :refresh="get_data" 
    :key="item.id" :disease_group="item.name" :disease_groupid="item.id"
    :disease_data="disease_data">
    </Disease_group>
  </div>
</template>

<script>
import Disease_group from '@/component/Disease_group.vue'
import { NetLoader } from '@/net';
export default {
  name: "Disease_list",
  data() {
    return {
      loader: new NetLoader("test"),
      disease_data: [],
      categories: this.$props.category
    };
  },
  props: {
    category: Array
  },
  methods: {
    get_data() {
      this.loader.get("/case/findAllCases").then((value) => {
        this.disease_data = value.data.data;
        console.log(this.disease_data);
      })
    }
  },
  components: { Disease_group },
  created() {
    this.get_data();
  }
}
</script>

<style scoped lang="less">
#disease_list {
  width: 70%;
  float: left;
  height: wrap-content;
  padding: 0;
  margin: 0;
}
</style>