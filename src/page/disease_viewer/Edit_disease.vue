<template>
  <div class="container">
    <el-card class="card">
      <div style="padding-top: 10px; margin-bottom: 20px;">
        <span style="font-size: 30px; font-weight: bold;">修改疾病</span><br>
        <span style="font-size: 20px; font-weight: normal;">正在尝试修改疾病：{{ s }}</span>
      </div>
      <span style="font-size: 20px; font-weight: normal;">请输入(新)疾病名：</span><br><br>
      <el-form :rules="rules" label-position="left" label-width="20px">
        <el-form-item label=" " prop="newName">
          <el-input v-model="newName" placeholder="请输入(新)疾病名"></el-input>
        </el-form-item>
      </el-form>
      <span style="font-size: 20px; font-weight: normal;">请输入(新)疾病描述：</span><br><br>
      <div class="editor">
        <quill-editor ref="myQuillEditor" v-model="content" :options="this.editorOption" @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)" @ready="onEditorReady($event)" @change="onEditorChange($event)" />
      </div>
      <div class="hospital_register-button">
        <div class="button">确定修改</div>
        &nbsp;&nbsp;
        <div class="button" @click="quit()">返回</div>
      </div>

    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  comments: { quillEditor },
  data() {
    return {
      rules: {
        newName: { required: true, message: '请输入疾病名', trigger: 'blur' }
      },
      content: '<h2>请输入疾病描述...</h2><br><br>',
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
            [{ 'align': [] }],
            ['clean'] // 格式清除
          ]
        }
      },
      s: "222"
    };
  },
  methods: {
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
    }
  },
  props: {},
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  created() {
    this.s = window.sessionStorage.getItem('rowNameToEdit');
    console.log(this.s);
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 90px);

  .card {
    margin-top: 30px;
    height: calc(90vh - 90px);
    width: 60vw;

    .hospital_register-button {
      width: 100%;
      margin-top: 20px;
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
}

.editor {
  background-color: white;
}
</style>