<template>
  <div class="container">
    <el-page-header @back="goBack" style="padding-top: 20px; padding-bottom: 10px; font-weight: bold; color: slateblue"
      :content="title" />
    <Table :label="labels" :width="widthList" :keys="keys" :url="url" :config="config"></Table>
  </div>
</template>

<script>
import Table from '@/component/Table.vue'
export default {
  name: "Staff_management",
  data() {
    return {
      labels: ["编号", "姓名", "年龄", "性别", "职位", "经验", "手机号", "身份证号", "入职日期", "所在地", "学历"],
      keys: ["id", "name", "age", "gender", "position", "experience", "phone", "idnumber", "date", "place", "edu"],
      widthList: [60, 90, 60, 60, 120, 60, 120, 170, 100, 80, 60],
      url: "/staff",
      title: "人员管理",
      config: ["uneditable_text", "uneditable_text", "num", "sex", "text", "num", "text", "uneditable_text", "date", "text", "text"]
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