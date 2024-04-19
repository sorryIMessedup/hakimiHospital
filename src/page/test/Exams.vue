<template>
  <div>
    <!-- 搜索栏和按钮 -->
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
      <el-input v-model="searchBar" placeholder="请输入关键字搜索" prefix-icon="el-icon-search" clearable @clear="getAll"
        @keyup.enter.native="search" style="flex: 1; margin-right: 10px;"></el-input>
      <el-button type="primary" @click="search" style="flex-shrink: 0;">搜索</el-button>
    </div>
    <!--考试list -->
    <el-table :data="exams" border style="width: 100%;margin-top: 20px;"
      :header-cell-style="{ background: 'rgb(242, 243, 244)', color: '#515a6e' }">
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
          <el-button type="primary" size="mini" @click="show_result(scope.row)">考试结果</el-button>

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
      currentUserName: "",
      formData: {
        name: "",
        startTime: "",
        endTime: "",
        visibility: "",
        score: 100,
        userTable: "",
        userList: [],
        questionList: [],
        categories: [],
        selectedUser: [],
        selectedQuestion: [],
        filteredQuestion: [],
        selectedCategory: [],
      },
      searchBar: ""
    }
  },

  methods: {
    search() {
      const name = this.searchBar;
      console.log("名字" + name)
      var url = "exams/search?name=" + name + "?status=false";
      this.loader.get(url).then(value => {
        const jsonData = value.data;
        // 将 JSON 数据转换为字符串并输出到控制台

        if (jsonData.code == 200) {
          let res = value.data.data;
          console.log(res)
          for (let item of res) {
            this.exams.push(item);
          }
        } else {
          console.log(400)
          this.$message.error(jsonData.message);
        }
      })

    },
    addExam() {
      const postData = {
        name: this.formData.name,
        whiteListUserIds: this.formData.selectedUser,
        questionIds: this.formData.selectedQuestion,
        startTime: this.formData.startTime.toISOString(),
        endTime: this.formData.endTime.toISOString(),
        score: this.formData.score,
        status: "",
        everyone: true
        // 其他表单项
      };
      var url = this.formData.visibility == "public" ? "exams/holdPublicExam" : "exams/holdPrivateExam";
      this.loader.post(url, postData)

      // 清空表单数据
      this.formData = {
        name: '', // 考试名称
        startTime: "",
        endTime: "",
        userList: [],
        visibility: "",
        questionList: [],
        score: 100
        // 其他表单项
      };
      this.getAll()
    },

    getAll() {
      // 清空现有的表单数据
      this.exams = [];
      this.loader.get("/exams/list").then((value) => {
        const jsonData = value.data;
        if (jsonData.code == 200) {
          let res = value.data.data;
          console.log(res)
          for (let item of res) {
            this.exams.push(item);
          }
        } else {
          console.log(400)
          this.$message.error(jsonData.message);
        }

      })
    },

    show_paper: function (row) {
      this.$router.push({ name: 'PaperDetail', params: { paperId: row.id } });
      /* this.loader.post('/exams/joinExam', { examId: row.id }).then((value) => {
        const jsonData = value.data;
        if (jsonData.code == 200) {
          this.$router.push({ name: 'PaperDetail', params: { paperId: row.id } });
        } else {
          this.$message.error(jsonData.message);
        }
      }).catch(({ response: res }) => {
        const message = res?.data?.message;
        if (message) {
          this.$message.error(message);
        } else {
          this.$message.error('未知错误！!');
        }
      }) */
    },
    show_result: function (row) {
      //查询当前用户的当前考试结果
      let examId = row.id
      this.loader.get('/exams/examId/checkParticipant')
        .then((value) => {
          if (value.data.code == 200) {
            let participant = value.data.status;
          } else {
            this.$message.error(jsonData.message);
          }
          if (!participant) {
            this.$message("你没有参加过这个考试");
          }
          this.$router.push({
            path: '/home/testResult', query: { questionList: this.questions, usrSelected: this.selected }
          })
        })
    },


    loadUserList() {
      this.loader.get('users/findAllUsers')
        .then((value) => {
          if (value.data.code == 200) {
            this.formData.userList = value.data.data;
          } else {
            this.$message.error(jsonData.message);
          }
          // 请求成功，获取用户数据并赋值给 questionList

        })

    },

    loadCategoryList() {
      this.loader.get('category/findAllCategories')
        .then((value) => {
          if (value.data.code == 200) {
            let categoryList = value.data.data
            this.formData.categories = categoryList.map(category => ({
              label: category.name,
              value: category.id
            }))
            console.log("category列表" + this.formData.categories)
          } else {
            this.$message.error(jsonData.message);
          }
          // 请求成功，获取用户数据并赋值给 questionList

        })
    },

    handleCategoryChange() {
      let value = this.formData.selectedCategory
      const categoryId = value[value.length - 1]; // 获取选中类别的值

      // 现在你可以使用 categoryId 和 categoryName 来做任何你想做的事情了
      console.log("选中的类别 ID：", categoryId);

      let url = "question/findByCategoryId?categoryIdStr=" + categoryId
      this.loader.get(url).then(value => {

        if (value.data.code == 200) {

          this.formData.questionList = value.data.data

        } else {
          this.$message.error(jsonData.message);
        }
      })
    }

  },


  created() {
    this.getAll()
    this.loadUserList()
    this.loadCategoryList()
  }
}
</script>

<style>
.exam-nav {
  min-height: calc(100vh - 60px);
  text-align: center
}
</style>