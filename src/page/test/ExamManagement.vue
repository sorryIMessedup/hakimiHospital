<template>
  <div>
    <!-- 搜索栏和按钮 -->
    <div style="display: flex; align-items: center; margin-bottom: 20px;">
      <el-input v-model="searchBar" placeholder="请输入关键字搜索" prefix-icon="el-icon-search" clearable @clear="getAll"
        @keyup.enter.native="search" style="flex: 0 1 300px; margin-right: 10px;"></el-input>
      <el-button type="primary" @click="search" style="flex-shrink: 0;">搜索</el-button>
      <el-button type="primary" size="medium" @click="showAddDialog">新增考试</el-button>
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
          <el-button type="primary" size="mini" @click="show_paper(scope.row)">考试记录</el-button>
          <el-button type="primary" size="mini" @click="delete_exam(scope.row)">删除考试</el-button>
		  <el-popover
		    placement="right"
			width="700"
			trigger="click">
			  <el-table :data="questionRecord">
				  <el-table-column width="400" property="exam" label="考试"></el-table-column>
				  <el-table-column width="200" property="user" label="用户"></el-table-column>
				  <el-table-column width="100" property="score" label="得分"></el-table-column>
			  </el-table>
			  <el-button type="primary" size="mini" slot="reference">考试结果</el-button>
			</el-popover>
        </template>
      </el-table-column>
    </el-table>

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
import { NetLoader } from '@/net';
export default {
  data() {
    return {
      loader: new NetLoader("test"),
      count: 0,
      dialogVisible: false, // 控制新增对话框的显示与隐藏的变量

      exams: [],
      currentUserName: "",
	  
      questionRecord: {
		  date: "",
		  user: "",
		  score: 0,
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

  methods: {
    search() {
      const name = this.searchBar;
      console.log("名字" + name)
      var url = "exams/search?name=" + name + "&status=false";
      this.loader.get(url).then(value => {
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
        status : "",
        everyone: true
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
      }).catch((res) => {
        this.$message.error(res.message)
      })
    },
    showAddDialog() {
      this.dialogVisible = true;
    },

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
          console.log(400)
          this.$message.error(jsonData.message);
        }
      })
    },

    show_paper: function (row) {
      let id = row.id
      this.$router.push({ name: 'PaperDetail', params: { paperId: id } });
      console.log("id是" + id)
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
    },
	
    cal_score: function() {
        for(let i=0; i<this.usrSelected.length; i++) {
            if (this.usrSelected[i] === this.questionsList[i].answer) {
                 this.score += this.questionsList[i].score
              }
          }
     },
	 
	 loadUserResult: function(){
		 this.load.get('examRecord/findAll')
			.then((value) => {
				if (value.data.code == 200){
					this.questionRecord.exam = value.data.exam
					this.questionRecord.user = value.data.user
					this.questionRecord.score = value.data.score
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