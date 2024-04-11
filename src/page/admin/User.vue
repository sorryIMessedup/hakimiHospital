<template>
  <div class="hospital_user-container">
    <el-table :data="userData" border style="width: 100%" >
      <el-table-column fixed label="用户名" width="100" prop="username" align="center"> </el-table-column>
      <el-table-column fixed label="权限" prop="auth" width="100" align="center"> </el-table-column>
      <el-table-column label="密保问题" prop="question" width="180" align="center"></el-table-column>
      <el-table-column label="密保答案" prop="answer" width="100" align="center"></el-table-column>
      <el-table-column label="用户ID" prop="id" width="200" ></el-table-column>
      <el-table-column label="密码" prop="password" width="300"></el-table-column>
      <el-table-column fixed="right" width="150">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

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

<script>
import { NetLoader } from "@/net";
export default {
  name: "User",
  data() {
    return {
      loader: new NetLoader("test"),
      search: "",
      userData: [],
      form: {
        username: "",
        password: "",
        id: "",
        auth: "",
        question: "",
        answer: ""
      },
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      title: "修改用户信息",
      status: "change"
    };
  },
  methods: {
    getUsers() { // 获取所有用户
      this.userData = [];
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
            auth: item.auth
          }
          this.userData.push(user);
        }
      });
    },

    handleEdit(index, row) { // 编辑用户
      this.title = "修改用户信息"
      this.status = "change"
      this.dialogFormVisible = true;
      this.form.username = row.username;
      this.form.password = row.password;
      this.form.id = row.id;
    },

    handleDelete(index, row) { // 删除用户
      console.log(index, row);
      this.form.username = row.username;
      this.form.password = row.password;
      this.form.id = row.id;
      this.$confirm("是否删除该用户？？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loader.delete("/users/deleteUser/" + this.form.id, {}).then(val => {
          this.$message({
            message: "删除成功",
            type: "success"
          })
          this.loader.get("/users/findAllUsers").then(val => {
            this.getUsers();
          })
          window.location.reload();
        }, err => {
          this.$message.error("删除信息失败")
        })
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
          this.loader.post("/users/addUser", this.form).then(val => {
            this.loader.get("/users/findAllUsers").then(val => {
              this.getUsers();
            })
            this.dialogFormVisible = false;
            this.$message({
              type: 'success',
              message: "操作成功"
            });
          }, err => {
            this.dialogFormVisible = false;
            this.$message.error("该用户已经存在，无法重复创建！！！")
          })
        }
        else if (this.status === "change") {
          this.loader.post("/users/changePasswordById", {
            userId: this.form.id,
            newPassword: this.form.password
          }).then(val => {
            this.dialogFormVisible = false;
            this.$message({
              type: 'success',
              message: "操作成功"
            });
            this.getUsers();
          }, err => {
            if (this.status === "change") {
              this.dialogFormVisible = false;
              this.$message.error("修改用户信息发生错误")
            } else if (this.status === "create") {
              this.dialogFormVisible = false;
              this.$message.error("该用户名已经存在，无法重复创建！！！")
            }
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
      this.form = {
        username: "",
        password: "",
        id: null
      },
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
</style>