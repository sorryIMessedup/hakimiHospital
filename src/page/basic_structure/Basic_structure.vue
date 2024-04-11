<template>
  <div id="basic_structure">
    <h1 style="text-align: center; margin-top: 20px;">
      基本结构与功能管理导航页面
    </h1>
    <el-row>
      <el-col v-for="section in section_list" :key="section.text" :span="12" style="align-items: center;">
        <el-card class="box-card" shadow="hover" v-on:click.native="show_detail(section.text)">
          <i :class="section.photo" style="font-size: 40px;"></i>
          <br/><br/>
          <h1 style="font-weight: 400;">{{ section.text }}</h1>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Basic_structure",
  data() {
    return {
      section_list: [
        { text: "科室管理", photo: "el-icon-office-building" },
        { text: "人员管理", photo: "el-icon-user" }, 
        { text: "药品管理", photo: "el-icon-dish" }, 
        { text: "档案管理", photo: "el-icon-notebook-2" }, 
        { text: "收费管理", photo: "el-icon-document-copy"}, 
        { text: "化验项目管理", photo: "el-icon-set-up"}, 
        { text: "疫苗管理", photo: "el-icon-first-aid-kit"}, 
        { text: "住院管理", photo: "el-icon-school"}
      ]
    }
  },
  methods: {
    show_detail: function (name) {
      let s = ""
      switch (name) {
        case "药品管理": s = "/medicine"; break;
        case "疫苗管理": s = "/vaccinum"; break;
        case "科室管理": s = "/department"; break;
        case "档案管理": s = "/record"; break;
        case "收费管理": s = "/charge"; break;
        case "化验项目管理": s = "/assay"; break;
        case "人员管理": s = "/staff"; break;
        case "住院管理": s = "/inpatient"; break;
      }
      this.$router.push({
        path: "/admin" + s
      })
    }
  }
}
</script>

<style lang="less" scoped>
#basic_structure {
  width: 100%;
  align-items: center;
}

.box-card {
  text-align: center;
  width: 250px;
  margin: auto;
  margin-top: 20px;
}

</style>