<template>
    <div>
        <el-table :data="exams" border style="width: 100%;margin-top: 20px;"
        :header-cell-style="{background: 'rgb(242, 243, 244)',color:'#515a6e'}">
            <el-table-column prop="id" label="考试id">
                <template slot-scope="scope">
                    考试{{ scope.row.id }}
                </template>
            </el-table-column>
          <el-table-column prop="name" label="考试名字">
          </el-table-column>
            <el-table-column prop="startTime" label="开始时间">
            </el-table-column>
          <el-table-column prop="endTime" label="结束时间">
          </el-table-column>
            <el-table-column prop="score" label="总分">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="show_paper(scope.row)">参加考试</el-button>
                    <el-button type="primary" size="mini" @click="delete_exam(scope.row)">删除考试</el-button>

                </template>
            </el-table-column>
        </el-table>

        <!-- <el-menu class="exam-nav">
            <el-menu-item :key="item.id" v-for="item in exams" v-on:click="show_paper(item.testpaper)">考试{{ item.id }}</el-menu-item>
        </el-menu> -->
        
        
    </div>
</template>

<script>
import { NetLoader } from '@/net';
export default {
    data() {
        return {
            loader: new NetLoader("test"),
            count: 0,
            exams: [],
            currentUserName: ""
        }
    },
    methods: {
      getAll() {
        // 清空现有的表单数据
        this.exams = [];
        this.loader.get("/exams/list").then((value) => {
          const jsonData = value.data;
          // 将 JSON 数据转换为字符串并输出到控制台
          console.log(JSON.stringify(jsonData));


          if (jsonData.code == 200) {
            let res = value.data.data;
            console.log(res)
            for (let item of res) {
              this.exams.push(item);
            }
          } else {
            this.$message.error(jsonData.message);
          }

        })},
        show_paper: function(row) {
            let users = row.users
            let flag = false
            for(let i=0; i<users.length; i++) {
                if (users[i].userName === this.currentUserName) {
                    flag = true
                }
            }
            if (flag === true) {
                this.$router.push({
                    path: '/home/testPaper', query: { questions: row.testpaper.questions, period: row.testpaper.period }
                })
            }
            else {
                this.$message('抱歉，您没有权限参加本考试')
            }
        },
        delete_exam: function (row){
          const examId = row.id;
          this.loader.post("/exams/setExamStatusToDeleted",{examId : examId}).then((value) =>{
            if(value.data.code == 200){
              this.getAll()
            }else{
              this.$message.error(jsonData.message);
            }
          })
        }
    },
    created() {
        this.getAll()

    }
}
</script>

<style>
.exam-nav {
    min-height: calc(100vh - 60px);
    text-align: center
}
</style>