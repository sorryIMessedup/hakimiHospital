<template>
  <div >
    <div class = "hospital_user-container">
      <div class="table-responsive table-wrapper">
        <table class="table table-vcenter table-nowrap table-shadow" data-aos="fade-up">
          <thead class="thead-light">
          <tr>
            <th>考试名字</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>总分</th>
            <th>举办人</th>
            <th>
              <div class="row">
                <div class="col">
                  <input type="text" @input="search"  class="form-control input-round" v-model="searchBar"  placeholder="查找考试名">
                </div>
                <div class="col">
                  <button type="submit" class="btn btn-primary btn-round" @click="showAddDialog">新增考试</button>
                </div>
              </div>
            </th>

            <th class="w-1"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="exam in paginatedExams" :key="exam.id">
            <td>{{ exam.name }}</td>
            <td>{{ exam.startTime }}</td>
            <td>{{ exam.endTime }}</td>
            <td>{{ exam.score }}</td>
            <td>{{exam.holder.username}}</td>
            <td>
              <button @click="delete_exam(exam)" class="btn btn-link">删除</button>

              <el-popover placement="right" width="700" trigger="click">
                <el-table :data="questionRecord" >
                  <el-table-column width="150" prop="user.username" label="受试者"></el-table-column>
                  <el-table-column width="150" prop="status" label="状态"></el-table-column>
                  <el-table-column width="100" prop="score" label="得分"></el-table-column>
                  <el-table-column width="150" prop="exam.holder.username" label="举行者"></el-table-column>
                </el-table>
                <el-button type="primary" size="mini" @click="loadUserResult(exam)" slot="reference" class="btn btn-link bg-primary">考试结果</el-button>
              </el-popover>
            </td>
          </tr>
          </tbody>
        </table>


      </div>
    </div>
    <!-- 搜索栏和按钮 -->

    <!-- pagination -->
    <nav aria-label="Page navigation example">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
      <ul class="pagination">
        <li class="page-item"><a class="page-link" href="#" @click="handlePreviousPage"><i
            class="fas fa-angle-left"></i></a></li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
          <a class="page-link" href="#" @click="handlePageClick(page)">{{ page }}</a>
        </li>
        <li class="page-item"><a class="page-link" href="#" @click="handleNextPage"><i
            class="fas fa-angle-right"></i></a></li>
      </ul>
    </nav>



    <!-- <el-menu class="exam-nav">
        <el-menu-item :key="item.id" v-for="item in exams" v-on:click="show_paper(item.testpaper)">考试{{ item.id }}</el-menu-item>
    </el-menu> -->

    <!-- 弹窗表单 -->
    <el-dialog title="新增考试" :visible.sync="dialogVisible" width="30%">
      <!-- 这里放置你的表单内容 -->
      <el-form :model="formData" ref="addDialogForm" label-width="80px">
        <el-form-item label="考试名字" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="考试总分" prop="score">
          <el-input v-model="formData.score"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker v-model="formData.startTime" type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker v-model="formData.endTime" type="datetime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="用户列表" prop="userTable">
          <el-select v-model="formData.selectedUser" multiple filterable>
            <!-- 这里渲染用户列表的选项 -->
            <el-option v-for="usr in formData.userList" :key="usr.id" :label="usr.username" :value="usr.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择问题">
          <el-cascader v-model="formData.selectedCategory" @change="handleCategoryChange" clearable
            :options="formData.categories" placeholder="请选择问题范畴" filterable>

          </el-cascader>
          <el-select v-model="formData.selectedQuestion" multiple filterable>
            <el-option v-for="question in formData.questionList" :key="question.id" :label="question.stem"
              :value="question.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="可见性" prop="visibility">
          <el-select v-model="formData.visibility">
            <el-option label="公开" value="public"></el-option>
            <el-option label="私有" value="private"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addExam">确定</el-button>
      </span>
    </el-dialog>





  </div>
</template>

<script>
import QuestionManagementVue from './QuestionManagement.vue';
import { NetLoader } from '@/net';
import '../../css/vendor/aos.css'
import AOS from '../../js/vendor/aos'
export default {
  data() {
    return {
      loader: new NetLoader("test"),
      count: 0,
      dialogVisible: false, // 控制新增对话框的显示与隐藏的变量

      exams: [],
      currentUserName: "",

      currentPage: 1, // 当前页码
      pageSize: 10,   // 每页显示的数据条数
      totalPages: 0,  // 总页数
      totalItems: 0,  // 总数据条数
      paginatedExams: [], // 当前页显示的数据

      questionRecord: {
		  username:"",
		  status:"",
		  score:"",
		  holder:"",
	  },

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
  computed: {
    // 根据当前页和每页显示的数据条数计算起始索引
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    // 根据起始索引和每页显示的数据条数截取出当前页显示的数据
    endIndex() {
      return (this.currentPage - 1) * this.pageSize + this.pageSize;
    }
  },

  methods: {
    handlePreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedUsers();
      }
    },
    handleNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedUsers();
      }
    },
    updatePaginatedUsers() {
      this.paginatedExams = []; // 清空当前页的数据

      // 通过循环手动构建当前页的数据
      for (let i = this.startIndex; i < this.endIndex && i < this.exams.length; i++) {
        this.paginatedExams.push(this.exams[i]);
        console.log(this.exams[i])
      }
      console.log("分页后" + this.paginatedUsers);
    },
    // 处理分页点击事件
    handlePageClick(page) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    },

    search() {
      const name = this.searchBar;

      var url = "exams/search?name=" + name ;
      this.loader.get(url).then(value => {
        const jsonData = value.data;
        // 将 JSON 数据转换为字符串并输出到控制台


        if (jsonData.code == 200) {
          let res = value.data.data;
          this.exams = [];
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
        everyone: false
        // 其他表单项
      };
      var url = this.formData.visibility == "public" ? "exams/holdPublicExam" : "exams/holdPrivateExam";
      this.loader.post(url, postData).then(() => {
        this.dialogVisible = false;

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
        this.loadUserList()
        this.loadCategoryList()
      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    showAddDialog() {
      console.log("biandekejian")
      this.dialogVisible = true;
    },

    getAll() {
      // 清空现有的表单数据
      this.exams = [];
      this.loader.get("/exams/list").then((value) => {
        const jsonData = value.data;
        // 将 JSON 数据转换为字符串并输出到控制台

        if (jsonData.code == 200) {
          let res = value.data.data;

          for (let item of res) {
            this.exams.push(item);
          }
          console.log("exam列表是："+ JSON.stringify( this.exams));

        } else {
          console.log(400)
          this.$message.error(jsonData.message);
        }
        this.updatePaginatedUsers()
        this.totalItems = this.exams.length; // 设置总数据条数
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); // 计算总页数
      })
    },

    show_paper: function (row) {
      let id = row.id
      this.$router.push({ name: 'PaperDetail', params: { paperId: id } });
    },

    delete_exam: function (row) {
      if (confirm("确定要删除考试吗？")) {
        // 用户点击了确认按钮，执行删除操作
        // 在这里执行删除考试的逻辑，例如发送请求到后端删除考试数据

        const examId = row.id;
        this.loader.post("/exams/setExamStatusToDeleted", { examId: examId }).then((value) => {
          if (value.data.code == 200) {
            this.getAll()
          } else {
            this.$message.error(jsonData.message);
          }
        }
        )
      }
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

      let url = "question/findByCategoryId?categoryIdStr=" + categoryId
      this.loader.get(url).then(value => {

        if (value.data.code == 200) {

          this.formData.questionList = value.data.data

        } else {
          this.$message.error(jsonData.message);
        }
      })
    },



    loadUserResult: function (row) {
	  let examId = row.id
	  this.questionRecord = [];
      this.loader.get('exams/getExamRecordsByExamId',{ examId: examId })
        .then((value) => {
          if (value.data.code == 200) {
			this.questionRecord = value.data.data
			console.log("tests:", this.questionRecord);
          } else{
			  this.$message.error(jsonData.message);
		  }
        })
    }
  },


  created() {
    this.getAll()
    this.loadUserList()
    this.loadCategoryList()
  },
  mounted() {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }
}
</script>

<style>
.hospital_user-container {
  margin-top: 15vh;

  .table-wrapper {
    padding: 0 60px;
    /* 在左右两侧留出相同的空白 */

  }}
.exam-nav {
  min-height: calc(100vh - 60px);
  text-align: center
}
</style>