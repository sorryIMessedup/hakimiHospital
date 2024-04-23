<template>
  <div class="container">
    <el-page-header @back="goBack" style="padding-top: 20px; padding-bottom: 10px; font-weight: bold; color: slateblue"
      :content="title" />
    <Table :label="labels" :width="widthList" :keys="keys" :base_url="base_url" :config="config" :add_url="add_url"
      :delete_url="delete_url" :getAll_url="getAll_url" :getById_url="getById_url" :searchByName_url="searchByName_url"
      :update_url="update_url"></Table>
  </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
  name: "Charge_management",
  data() {
    return {
      labels: ["编号", "档案名称", "档案介绍"],
      keys: ["id", "name", "info"],
      widthList: [120, 150, 500],
      base_url: "/record",
      add_url: '/addRecord',
      delete_url: '/deleteRecord',
      getAll_url: '/findAllRecords',
      getById_url: '/findRecordById',
      searchByName_url: '/searchRecordsByName',
      update_url: '/updateRecord',
      title: "档案管理",
      config: ["uneditable_text", "uneditable_text", "text"]
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