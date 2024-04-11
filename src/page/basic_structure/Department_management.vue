<template>
  <div class="container">
    <el-page-header @back="goBack" :content="title"></el-page-header>
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
      labels: ["编号", "科室名称", "介绍", "权限"],
      keys: ["id", "name", "info", "roleList"],
      widthList: [120, 150, 300, 250],
      base_url: "/department",
      add_url: '/addDepartment',
      delete_url: '/deleteDepartment',
      getAll_url: '/findAllDepartments',
      getById_url: '/findDepartmentById',
      searchByName_url: '/searchDepartmentsByName',
      update_url: '/updateDepartment',
      title: "科室管理",
      config: ["uneditable_text", "uneditable_text", "text", "roleList"]
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
  margin-top: 10px;
  margin-left: 10px;
}
</style>