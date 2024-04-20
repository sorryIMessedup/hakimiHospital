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
        <el-button style="float: right; padding: 3px 0" type="text" v-on:click="add_case()"
          v-if="auth == '2'">添加病例</el-button>
      </div>
      <el-table :data="this.list" style="width: 100%" border>
        <el-table-column fixed width="120" prop="name" label="病例名" align="center" />
        <el-table-column fixed width="120" prop="name" label="疾病名" align="center" />
        <el-table-column prop="id" width="300" label="病例ID" align="center" />
        <el-table-column fixed="right" width="230">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleView(scope.row)">查看</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)" v-if="auth == '2'">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)" v-if="auth == '2'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-card>

    <el-dialog title="" :visible.sync="addVisible" width="60%" :before-close="handleClose">
      <span style="font-size: 25px; font-weight: bold; color:black;" v-if="this.status == 1">
        添加病例<br>
      </span>
      <span style="font-size: 25px; font-weight: bold; color:black;" v-if="this.status == 0">
        修改病例<br>
        <span style="font-size: 15px; font-weight: normal;">您正在尝试修改：{{ rrow.name }} (#{{ rrow.id }})</span>
      </span><br>
      <span style="font-size: 15px; font-weight: normal;">您目前处在的病类是：{{ this.$props.disease_group }}</span>
      <el-divider></el-divider>
      <el-form :model="form1" label-position="left" label-width="100px" :rules="rules">
        <el-form-item label="病例名" prop="name">
          <el-input v-model="form1.name" placeholder="请输入病例名"></el-input>
        </el-form-item>
        <el-form-item label="从属疾病" prop="corrDisease">
          <el-select v-model="form1.corrDisease" placeholder="请选择从属疾病">
            <el-option v-for="item in this.list3" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span style="font-size: 20px; font-weight: bold; color:black">病例描述</span><br><br>
      <div class="editor">
        <quill-editor ref="myQuillEditor1" v-model="text1" @blur="onEditorBlur($event)" :options="this.editorOption"
          @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)" />
      </div>
      <el-divider></el-divider>
      <span style="font-size: 20px; font-weight: bold; color:black">接诊</span><br><br>
      <div class="editor">
        <quill-editor ref="myQuillEditor2" v-model="text2" @blur="onEditorBlur($event)" :options="this.editorOption"
          @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)" />
      </div>
      <el-divider></el-divider>
      <span style="font-size: 20px; font-weight: bold; color:black">病例检查</span><br><br>
      <div class="editor">
        <quill-editor ref="myQuillEditor3" v-model="text3" @blur="onEditorBlur($event)" :options="this.editorOption"
          @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)" />
      </div>
      <el-divider></el-divider>
      <span style="font-size: 20px; font-weight: bold; color:black">诊断结果</span><br><br>
      <div class="editor">
        <quill-editor ref="myQuillEditor4" v-model="text4" @blur="onEditorBlur($event)" :options="this.editorOption"
          @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)" />
      </div>
      <el-divider></el-divider>
      <span style="font-size: 20px; font-weight: bold; color:black">治疗方案</span><br><br>
      <div class="editor">
        <quill-editor ref="myQuillEditor5" v-model="text5" @blur="onEditorBlur($event)" :options="this.editorOption"
          @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)" />
      </div>
      <el-divider></el-divider>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm()">确定</el-button>
      </span>
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
  components: { quillEditor },
  name: "Disease_group",
  data() {
    return {
      status: 1,
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
      rrow: '',
      auth: '',
      currentPage4: 4,
      search: "",
      list: [],
      loader: new NetLoader("test"),
      list2: [],
      list3: [],
      list4: [],
      addVisible: false,
      text1: '请输入病例描述...',
      text2: '请输入病例接诊...',
      text3: '请输入病例检查...',
      text4: '请输入病例诊断结果...',
      text5: '请输入病例治疗方案...',
      form1: { name: '', corrDisease: '' },
      rules: {
        name: [{ required: true, message: '请输入疾病名', trigger: 'blur' }],
        corrDisease: [{ required: true, message: '请选择从属疾病', trigger: 'blur' }]
      }
    };
  },
  methods: {
    get_data() {
      this.auth = window.localStorage.getItem('token');
      this.loader.get("/case/findAllCases").then((val) => {
        this.list = [];
        this.list2 = [];
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
        this.list = res;
      })
      this.loader.get("/disease/findAllDiseases").then((val) => {
        this.list3 = [];
        this.list4 = [];
        let res = val.data.data;
        console.log(res);
        for (let item of res)
          this.list4.push(item);
        this.list3 = this.list4;
      }).then(() => {
        let target = this.$props.disease_groupid;
        var res = [];
        for (let item of this.list3) {
          if (item.category.id == target)
            res.push(item);
        }
        console.log(res);
        this.list3 = res;
      })
    },
    add_case() {
      this.status = 1;
      this.form1.name = '';
      this.form1.corrDisease = '';
      this.text1 = '请输入病例描述...';
      this.text2 = '请输入病例接诊...';
      this.text3 = '请输入病例检查...';
      this.text4 = '请输入病例诊断结果...';
      this.text5 = '请输入病例治疗方案...';
      this.addVisible = true;
    },
    handleEdit(row) {
      this.status = 0;
      console.log(row);
      this.form1.name = row.name;
      this.form1.corrDisease = row.disease;
      this.rrow = row;
      this.text1 = row.textList[0];
      this.text2 = row.textList[1];
      this.text3 = row.textList[2];
      this.text4 = row.textList[3];
      this.text5 = row.textList[4];
      this.addVisible = true;
    },
    handleView(row) {
      console.log(row);
      this.rrow = row;
      this.$router.push("/home/view_case");
    },
    handleConfirm() {
      this.addVisible = false;
      let textList = [];
      textList.push(this.text1);
      textList.push(this.text2);
      textList.push(this.text3);
      textList.push(this.text4);
      textList.push(this.text5);
      console.log(textList);
      this.loader.post("/case/addCase", {
        textList: textList,
        name: this.form1.name,
        categoryId: this.disease_groupid,
        disease: { id: this.form1.corrDisease }
      }).then(val => {
        console.log(val);
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
      }, err => {
        this.$message({ type: 'warning', message: err.response.data.message });
        console.log(err);
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
    }
  },
  created() {
    this.get_data();
  },
  props: {
    disease_group: String,
    disease_groupid: String,
    disease_data: Array
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor1.quill;
    }
  }
}
</script>

<style scoped lang="less">
.el-dialog__body {
  padding-top: 0px;
}

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