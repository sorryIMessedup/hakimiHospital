<template>
  <div id="disease_group">
    <el-card class="box-card" style="margin-top: -10px;">
      <div slot="header" class="clearfix">
        <span>{{ disease_group }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="add_disease">添加疾病</el-button>
      </div>
      <el-table :data="this.$props.disease_data" style="width: 100%" border>
        <el-table-column fixed width="120" prop="name" label="疾病名称" align="center" />
        <el-table-column prop="name" width="300" label="示意图片" align="center" />
        <el-table-column prop="name" width="300" label="示意视频" align="center" />
        <el-table-column fixed="right" width="150">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { NetLoader } from '@/net';
export default {
  name: "Disease_group",
  data() {
    return {
      currentPage4: 4,
      search: "",
      list: []
    };
  },
  methods: {
    show_data: function (name) {
      let usr = "home"
      if (this.$store.state.type == "admin") {
        usr = "admin"
      }
      this.$router.push({
        path: '/' + usr + '/disease_view', query: { disease_name: name, disease_group: this.disease_group }
      })
    },
    delete_disease: function (name) {
      let loader = new NetLoader("test")
      this.$confirm('这将会永久删除数据，确定继续删除吗？', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        loader.get("/case/deleteByName?name=" + name + "").then(() => {
          this.$message({
            message: '删除成功',
            type: "success"
          });
          this.$props.refresh();
        })
      }).catch(() => {
      });
    },
    add_disease: function () {
      window.localStorage.setItem('disease_groupid', this.disease_groupid);
      this.$router.push({
        path: '/admin/add_disease', query: { disease_group: this.disease_group }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  props: {
    disease_group: String,
    disease_groupid: String,
    disease_data: Array,
    refresh: Function
  }
}
</script>

<style scoped lang="less">
#disease_group {
  width: 100%;
  height: wrap-content;
  //background: rgb(227, 81, 171);
  padding: 0;
  margin: 0;
  margin-top: 30px;
}

#header {
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
</style>