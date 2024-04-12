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
        labels: ["编号", "收费名称", "收费介绍"],
        keys: ["id", "name", "info"],
        widthList: [120, 150, 500],
        base_url: "/charge",
        add_url: '/addCharge',
        delete_url: '/deleteCharge',
        getAll_url: '/findAllCharges',
        getById_url: '/findChargeById',
        searchByName_url: '/searchChargesByName',
        update_url: '/updateCharge',
        title: "收费管理",
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
    margin-top: 10px;
    margin-left: 10px;
    background-color: white;
  }
  </style>