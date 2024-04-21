<template>
  <div class="container">
    <el-page-header @back="goBack" 
      style="padding-top: 20px; padding-bottom: 10px; font-weight: bold; color: slateblue"
      :content="title"/>
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
      labels: ["编号", "科室名称", "科室介绍"],
      keys: ["id", "name", "info"],
      widthList: [200, 150, 500],
      base_url: "/department",
      add_url: '/addDepartment',
      delete_url: '/deleteDepartment',
      getAll_url: '/findAllDepartments',
      getById_url: '/findDepartmentById',
      searchByName_url: '/searchDepartmentsByName',
      update_url: '/updateDepartment',
      title: "科室管理",
      config: ["uneditable_text", "uneditable_text", "text"]
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

<style lang="less" scoped>
.container {
  margin: 0 auto;
  background-color: white;
}
</style>