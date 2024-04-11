<template>
  <div>
    <el-page-header @back="goBack" :content="title"></el-page-header>
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
      this.$router.go(-1)
    }
  },
  components: { Table },
}
</script>

<style lang="less" scoped></style>