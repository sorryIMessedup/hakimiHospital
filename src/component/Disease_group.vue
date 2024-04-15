<template>
    <div id="disease_group">
      <el-card class="box-card" style="margin-top: -10px;">
        <div slot="header" class="clearfix">
          <span>{{ disease_group }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" v-on:click="add_disease">添加病例</el-button>
        </div>
        <el-table :data="this.list" style="width: 100%" border>
          <el-table-column fixed width="120" prop="name" label="病例名" align="center" />
          <el-table-column fixed width="120" prop="name" label="疾病名" align="center" />
          <el-table-column prop="name" width="300" label="示意图片" align="center" />
          <el-table-column fixed="right" width="230">
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        list: [],
        loader: new NetLoader("test"),
        list2: []
      };
    },
    methods: {
      get_data() {
        this.loader.get("/case/findAllCases").then((val) => {
          this.list = [];
          let res = val.data.data;
          for (let item of res)
            this.list2.push(item);
          this.list = this.list2;
        }).then(() => {
          let target = this.$props.disease_groupid;
          var res = [];
          for (let item of this.list) {
            if (item.categoryId == target)
              res.push(item);
          }
          console.log(res);
          this.list = res;
        })
  
      },
      handleDelete(row) {
        console.log(row);
        this.$confirm('此操作将永久删除该病例, 是否继续?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          this.loader.delete("/case/deleteCase", { id: row.id }).then(val => {
            console.log(val);
            this.list = [];
            this.get_data();
          }, err => {
            this.$message({ type: 'warning', message: err.response.data.message });
            console.log(err);
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleSizeChange(val) {
        // @TODO
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // @TODO
        console.log(`当前页: ${val}`);
      }
    },
    created() {
      this.get_data();
    },
    props: {
      disease_group: String,
      disease_groupid: String,
      disease_data: Array
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