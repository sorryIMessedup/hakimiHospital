<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="hospital_user-container">
    <div>
      <div class="table-responsive table-wrapper" >

        <table
            class="table table-vcenter table-nowrap table-shadow" >
          <thead class="thead-light">
          <tr>
            <th>用户名</th>

            <th>邮箱</th>
            <th>权限</th>
            <th>密保问题</th>
            <th>密保答案</th>
            <th><div class="row">
              <div class="col">
                <input type="text" class="form-control input-round" placeholder="查找用户名" v-model="placeusername">
              </div>
              <div class="col">
                <button type="submit" class="btn btn-primary btn-round"  @click="handleSubmit">提交</button>
              </div>
            </div></th>
            <th></th>
            <th class="w-1"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.auth }}</td>
            <td>{{ user.question }}</td>
            <td>{{ user.answer }}</td>

            <td>
              <button @click="handleEdit(user)" class="btn btn-link">编辑</button>
              <button @click="handleDelete(user)" class="btn btn-link">删除</button>
            </td>



          </tr>

          </tbody>

        </table>
        <!-- pagination -->
        <nav aria-label="Page navigation example">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#" @click="handlePreviousPage"><i class="fas fa-angle-left"></i></a></li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }">
              <a class="page-link" href="#" @click="handlePageClick(page)">{{ page }}</a>
            </li>
            <li class="page-item"><a class="page-link" href="#" @click="handleNextPage"><i class="fas fa-angle-right"></i></a></li>
          </ul>

        </nav>

        <el-dialog :title="title" :visible.sync="dialogFormVisible">
          <h1 style="padding-bottom: 20px; padding-left: 5px; margin-top: -20px;">请输入用户的相关信息</h1>
          <el-form :rules="rules" label-position="left" label-width="80px" :model="formLabelAlign"
                   style="padding-left: 10px;">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formLabelAlign.username" placeholder="请输入用户名" :disabled="this.disabled[0]"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formLabelAlign.password" placeholder="请输入密码" :disabled="this.disabled[1]"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmedPassword">
              <el-input v-model="formLabelAlign.confirmedPassword" placeholder="请输入确认密码"
                        :disabled="this.disabled[2]"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱" :disabled="this.disabled[3]"></el-input>
            </el-form-item>
            <el-form-item label="用户权限" prop="auth">
              <el-select v-model="formLabelAlign.auth" placeholder="请选择权限" :disabled="this.disabled[4]">
                <el-option label="管理员" value="2"></el-option>
                <el-option label="实习生" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密保问题" prop="question">
              <el-select v-model="formLabelAlign.questions" placeholder="请选择密保问题" :disabled="this.disabled[5]">
                <el-option label="你就读的学校是什么？" value="你就读的学校是什么？"></el-option>
                <el-option label="你最印象深刻的人是谁？" value="你最印象深刻的人是谁？"></el-option>
                <el-option label="你的宠物名字是什么？" value="你的宠物名字是什么？"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="密保答案" prop="answer">
              <el-input v-model="formLabelAlign.answer" placeholder="请输入密保答案" :disabled="this.disabled[6]"></el-input>
            </el-form-item>
          </el-form>
          <div class="hospital_register-button">
            <div class="button" @click="confirm">注册</div>
            &nbsp;&nbsp;
            <div class="button" @click="dialogFormVisible = false">返回</div>
          </div>
        </el-dialog>
      </div>
    </div>

    <div class="hospital_user-addBtn" @click="addUser">
      <svg t="1680230985100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="1537" width="70" height="70">
        <path
            d="M514.048 62.464q93.184 0 175.616 35.328t143.872 96.768 96.768 143.872 35.328 175.616q0 94.208-35.328 176.128t-96.768 143.36-143.872 96.768-175.616 35.328q-94.208 0-176.64-35.328t-143.872-96.768-96.768-143.36-35.328-176.128q0-93.184 35.328-175.616t96.768-143.872 143.872-96.768 176.64-35.328zM772.096 576.512q26.624 0 45.056-18.944t18.432-45.568-18.432-45.056-45.056-18.432l-192.512 0 0-192.512q0-26.624-18.944-45.568t-45.568-18.944-45.056 18.944-18.432 45.568l0 192.512-192.512 0q-26.624 0-45.056 18.432t-18.432 45.056 18.432 45.568 45.056 18.944l192.512 0 0 191.488q0 26.624 18.432 45.568t45.056 18.944 45.568-18.944 18.944-45.568l0-191.488 192.512 0z"
            p-id="1538"></path>
      </svg>
    </div>
  </div>
</template>

<script src="./assets/js/vendor/aos.js" type="text/javascript"></script>

<script>
import { NetLoader } from "@/net";
export default {
  data() {
    return {
      loader: new NetLoader("test"),
      search: "",
      userData: [],
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      title: "修改用户信息",
      status: "change",
      users : [],
      currentPage: 1, // 当前页码
      pageSize: 10,   // 每页显示的数据条数
      totalPages: 0,  // 总页数
      totalItems: 0,  // 总数据条数
      paginatedUsers: [], // 当前页显示的数据
      placeusername : "",
      formLabelAlign: {
        username: '',
        password: '',
        confirmedPassword: '',
        email: '',
        questions: '',
        answer: '',
        auth: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, message: '长度至少为2个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '长度至少为6个字符且包含字母', trigger: 'blur' }],
        confirmedPassword: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
        auth: [{ required: true, message: '请选择权限', trigger: 'blur' }]
      },
      disabled: [false, false, false, false, false, false, false]
    };
  },
  computed: {
    // 根据当前页和每页显示的数据条数计算起始索引
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    // 根据起始索引和每页显示的数据条数截取出当前页显示的数据
    endIndex() {
      return Math.min(this.startIndex + this.pageSize - 1, this.totalItems - 1);
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
      console.log("分页呀")
      this.paginatedUsers = this.users.slice(this.startIndex, this.pageSize);
      console.log("分页后"+this.paginatedUsers);
    },
    // 处理分页点击事件
    handlePageClick(page) {
      this.currentPage = page;
      this.updatePaginatedUsers();
    },
    handleSubmit(){
      this.loader.get("/users/searchByUsername?username=" + this.placeusername).then((res) =>{
        this.userData = [];
        this.users = [];

        for (let item of res.data.data) {
          if (item.auth == 2)
            item.auth = "管理员";
          else item.auth = "实习生";
          let user = {
            id: item.id,
            username: item.username,
            password: item.password,
            question: item.securityQuestion,
            answer: item.securityQuestionAnswer,
            auth: item.auth,
            email: item.email
          }
          this.users.push(user)

          this.userData.push(user);
        }
      })
    },
    getUsers() { // 获取所有用户
      this.userData = [];
      this.users = [];
      this.loader.get("/users/findAllUsers").then((res) => {
        console.log(res.data.data)
        for (let item of res.data.data) {
          if (item.auth == 2)
            item.auth = "管理员";
          else item.auth = "实习生";
          let user = {
            id: item.id,
            username: item.username,
            password: item.password,
            question: item.securityQuestion,
            answer: item.securityQuestionAnswer,
            auth: item.auth,
            email: item.email
          }
          this.users.push(user)

          this.userData.push(user);

        }
        this.updatePaginatedUsers()
        this.totalItems = this.users.length; // 设置总数据条数
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); // 计算总页数
      });
    },

    handleEdit(row) { // 编辑用户
      this.title = "修改用户信息"
      this.status = "change"
      this.dialogFormVisible = true;
      this.formLabelAlign.username = row.username;
      this.formLabelAlign.password = "";
      this.formLabelAlign.email = row.email;
      this.formLabelAlign.id = row.id;
      this.formLabelAlign.questions = row.question;
      this.formLabelAlign.auth = row.auth;
      this.formLabelAlign.answer = row.answer;
      this.disabled = [true, false, false, true, false, true, true];
    },

    handleDelete(row) { // 删除用户
      console.log(row);

      this.formLabelAlign.id = row.id;
      this.$confirm("是否删除该用户？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loader.delete("/users/deleteUser/" + this.formLabelAlign.id, {}).then(val => {
          console.log(val);
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.getUsers();
        }, err => {
          console.log(err);
          this.$message.error("删除信息失败");
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },


    confirm() {
      let confirmTitle = this.status === "change" ? "是否确认修改用户信息？" : "是否确认添加该新用户";
      this.$confirm(confirmTitle, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.status === "create") {
          this.loader.put("/users/updateUser", this.formLabelAlign).then(val => {
            console.log(val);
            this.getUsers();
            this.dialogFormVisible = false;
            this.$message({
              type: 'success',
              message: "操作成功"
            });
          }, err => {
            this.dialogFormVisible = false;
            this.$message.error(err.response.data.message);
          })
        }
        else if (this.status === "change") {
          this.loader.post("/users/changePasswordById", {
            userId: this.formLabelAlign.id,
            newPassword: this.formLabelAlign.password
          }).then(val => {
            console.log(val);
            this.loader.post("users/updateAuth?auth=" + this.formLabelAlign.auth +
                "&id="+ this.formLabelAlign.id).then(val => {
              console.log(val);
            }, err => {
              console.log(err);
              this.$message.error(err.response.data.message);
            })
            this.dialogFormVisible = false;
            this.$message({
              type: 'success',
              message: "操作成功"
            });
            this.getUsers();
          }, err => {
            console.log(err);
            this.$message.error(err.response.data.message);
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    addUser() {
      this.disabled = [false, false, false, false, false, false, false];
      this.formLabelAlign = {};
      this.title = "创建新用户";
      this.status = "create"
      this.dialogFormVisible = true;
    }
  },
  created() {
    this.getUsers();

  },
};
</script>

<style lang="less" scoped>
.hospital_user-container {
  .table-wrapper {
    padding: 0 60px; /* 在左右两侧留出相同的空白 */

  }
  .table-shadow{
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
    border-radius: 8px; /* 可选：添加圆角效果 */
    overflow: hidden; /* 防止阴影被裁剪 */
  }
  height: 100vh;
  background-position: center center;
  background-repeat: repeat;
  background-size: 100%;

  .hospital_user-addBtn {
    position: fixed;
    bottom: 30px;
    right: 40px;
    border-radius: 100%;
    background: transparent;

    svg {
      fill: #409EFF;
      // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
}

.el-input {
  max-width: 40vw;
}

.hospital_register-button {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;

  .button {
    width: 80%;
    padding: 10px 0px;
    background: rgba(40, 40, 40);
    color: #fff;
    font-size: 14px;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 20px;
  }
}
</style>