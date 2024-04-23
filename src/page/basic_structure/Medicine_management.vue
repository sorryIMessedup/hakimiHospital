<template>
  <div class="container">
    <el-page-header @back="goBack" 
      style="padding-top: 20px; padding-bottom: 10px; font-weight: bold; color: slateblue"
      :content="title"/>
    <Table :label="labels" :width="widthList" :keys="keys" :base_url="base_url" :config="config" :add_url="add_url"
      :delete_url="delete_url" :getAll_url="getAll_url" :getById_url="getById_url" :searchByName_url="searchByName_url"
      :update_url="update_url" :uploadPic_url="uploadPic_url"></Table>
  </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
  name: "Medicine_management",
  data() {
    return {
      labels: ["编号", "药物名称", "药品作用", "药品图片"],
      keys: ["id", "name", "info", "picUrl"],
      widthList: [120, 150, 90, 570],
      base_url: "/drugs",
      add_url: '/addDrug',
      delete_url: '/deleteDrug',
      getAll_url: '/findAllDrugs',
      getById_url: '/findDrugById',
      searchByName_url: '/findDrugsByName',
      update_url: '/updateDrug',
      uploadPic_url: '/uploadPic',
      title: "药品管理",
      config: ["uneditable_text", "uneditable_text", "float", "text"]
    }
  },
  methods: {
    goBack() {
      this.$router.push("/admin/mainpage")
    }
  },
  components: { Table },
}
</script>

<style lang="less" scoped>
.container {
  margin: 0 auto;
  background-color: white;
}
</style>