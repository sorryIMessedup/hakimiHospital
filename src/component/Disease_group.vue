<template>
  <div id="disease_group">
    <el-card class="box-card" style="margin-top: -10px;">
      <div slot="header" class="clearfix">
        <span style="font-size: 25px; font-weight: normal; padding-left: 5px;">
          病类&nbsp;
        </span>
        <span style="font-size: 25px; font-weight: bold; padding-left: 0px;">
          {{ disease_group }}
        </span>
        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="add_disease">添加疾病</el-button>
      </div>

      <el-table :data="list.slice((pageNum - 1) * pageSize, pageNum * pageSize)" style="width: 100%" border>
        <el-table-column fixed width="200" prop="name" label="疾病名" align="center" />
        <el-table-column prop="id" width="300" label="疾病ID" align="center" />
        <el-table-column fixed="right" width="230">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        :current-page="pageNum"
        :page-sizes="[1, 2, 5, 10]" 
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <el-dialog title="添加疾病" :visible.sync="addVisible2" width="30%" :before-close="handleClose">
      <span>病类：{{ disease_group }}</span>
      <el-form :rules="rules2" :model="form2">
        <el-form-item label="疾病名" prop="name">
          <el-input v-model="form2.name" placeholder="请输入疾病名"></el-input>
        </el-form-item>
        <el-form-item label="疾病描述" prop="info">
          <el-input v-model="form2.info" placeholder="请输入疾病描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible2 = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm2()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="" width="60%" :visible.sync="addVisible3" :before-close="handleClose">
      <div class="container">
        <div>
          <div style="padding-top: 0px; margin-bottom: 20px;">
            <span style="font-size: 30px; font-weight: bold;">编辑疾病</span><br>
            <span style="font-size: 20px; font-weight: normal;">正在尝试编辑：{{ this.rrow.name }}</span>
            <span style="font-size: 20px; font-weight: normal;">&nbsp;(#{{ this.rrow.id }})</span>
          </div>
          <el-divider></el-divider>
          <span style="font-size: 20px; font-weight: normal;">请输入(新)疾病名：</span><br><br>
          <el-form :rules="rules" label-position="left" label-width="20px">
            <el-form-item label=" " prop="newName">
              <el-input v-model="newName" placeholder="请输入(新)疾病名"></el-input>
            </el-form-item>
          </el-form>
          <span style="font-size: 20px; font-weight: normal;">请输入(新)疾病描述：</span><br><br>
          <div class="editor">
            <quill-editor ref="myQuillEditor" v-model="rrow.info" :options="this.editorOption"
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
              @change="onEditorChange($event)" />
          </div>
          <el-divider></el-divider>
          <div class="hospital_register-button">
            <div class="button" @click="addVisible3 = handleConfirm3()">确定修改</div>
            &nbsp;&nbsp;
            <div class="button" @click="addVisible3 = false">返回</div>
          </div>
        </div>
        <div>
          <div style="width: 100px; margin-left: 20px;">
            <div style="height: 125px;"></div>
            <span style="font-size: 20px; font-weight: normal;">文件附件：</span><br><br>
            <el-upload class="upload-demo" action="disease/uploadFile" :on-preview="handlePreview"
              :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
              :file-list="fileList" :http-request="handleFileUpload">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">文件大小不能超过5MB</div>
            </el-upload>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="addVisible1" :before-close="handleClose">
      <div class="container">
        <div>
          <div style="padding-top: 0px; margin-bottom: 20px;">
            <span style="font-size: 30px; font-weight: bold;">查看疾病</span><br>
            <span style="font-size: 20px; font-weight: normal;">正在查看：{{ this.rrow.name }}</span>
            <span style="font-size: 20px; font-weight: normal;">&nbsp;(#{{ this.rrow.id }})</span>
          </div>
          <el-divider></el-divider>
          <div class="editor">
            <quill-editor ref="myQuillEditor" v-model="rrow.info" :options="{ modules: { toolbar: false } }"
              @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)"
              @change="onEditorChange($event)" />
          </div>
          <div class="hospital_register-button">
            <div class="button" @click="addVisible1 = false">我知道了</div>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { NetLoader } from '@/net';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: "Disease_group",
  // eslint-disable-next-line vue/no-unused-components
  components: { quillEditor },
  data() {
    return {
      pageNum: 1,
      pageSize: 5,
      total: 0,
      search: "",
      list: [],
      loader: new NetLoader("test"),
      addVisible1: false,
      addVisible2: false,
      addVisible3: false,
      fileList: [],
      rrow: '',
      newName: '',
      form: {},
      form2: { name: '', info: '' },
      rules: { newName: { required: true, message: '请输入疾病名', trigger: 'blur' } },
      rules2: {
        name: [{ required: true, message: '请输入疾病名', trigger: 'blur' }],
        info: [{ required: true, message: '请输入疾病描述', trigger: 'blur' }]
      },
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 字体
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }], // 样式标题
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // 下标、上标
            [{ 'indent': '-1' }, { 'indent': '+1' }], // 缩进
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            ['image'],
            [{ 'align': [] }],
            ['clean'] // 格式清除
          ]
        }
      },
    };
  },
  methods: {
    add_disease() {
      this.addVisible2 = true;
    },
    handleConfirm2() {
      this.addVisible2 = false;
      this.loader.post("/disease/addDisease", {
        category: { id: this.$props.disease_groupid, name: this.$props.disease_group },
        name: this.form2.name,
        info: this.form2.info
      }).then(val => {
        if (val.status == 200) {
          this.$message.success('添加疾病成功');
          this.list = [];
          this.get_data();
        } else {
          this.$message.error(val.data.data.message);
        }
      }, err => {
        this.$message.error(err.response.data.message);
        console.log(err);
      })
    },
    handleConfirm3() {
      this.addVisible2 = false;
      this.loader.put("/disease/updateDisease", {
        category: { id: this.$props.disease_groupid, name: this.$props.disease_group },
        name: this.newName,
        info: this.rrow.info,
        id: this.rrow.id
      }).then(val => {
        if (val.status == 200) {
          this.$message.success('更新疾病成功');
          this.list = [];
          this.get_data();
        } else {
          this.$message.error(val.data.data.message);
        }
      }, err => {
        this.$message.error(err.response.data.message);
        console.log(err);
      })
    },
    get_data() {
      this.loader.get("/disease/findAllDiseases").then((val) => {
        let res = val.data.data;
        this.list = [];   // 最终展示在病类中的条目
        let target = this.$props.disease_groupid;
        for (let item of res) {
          if (item.category.id == target)
            this.list.push(item);
        }
        console.log(this.list);
        this.total = this.list.length;
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该病例, 是否继续?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'danger'
      }).then(() => {
        this.loader.delete("/disease/deleteDisease", { id: row.id }).then(val => {
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
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      console.log("New Page Size: " + newSize);
      // this.get_data();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      console.log("New Page Num: " + newPage);
      // this.get_data();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        // eslint-disable-next-line no-unused-vars
        .then(_ => {
          done();
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_ => { });
    },
    handleView(row) {
      console.log(row);
      this.rrow = row;
      this.addVisible1 = true;
    },
    handleEdit(row) {
      console.log(row);
      this.rrow = row;
      this.fileList = row.files;
      this.addVisible3 = true;
    },
    quit() {
      this.$router.push("/admin/disease_list");
    },
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // eslint-disable-next-line no-unused-vars
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleFileUpload(file) {
      this.loading = true;
      this.loader.post("disease/uploadFile", {
        file: file.file,
        id: this.rrow.id
      }).catch((e) => {
        this.$message.error(e.message);
        this.$refs.upload.clearFiles();
      })
    }
  },
  created() {
    this.get_data();
  },
  props: {
    disease_group: String,
    disease_groupid: String
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
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

.container {
  color: black;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  .hospital_register-button {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;

    .button {
      margin-left: 20px;
      width: 200px;
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
}
</style>