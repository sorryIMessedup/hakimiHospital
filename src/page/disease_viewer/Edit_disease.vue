<template>
  <div class="container">
    {{ s }}
    <div class="editor">
      <quill-editor
        ref="myQuillEditor" 
        v-model="content" 
        :options="this.editorOption" 
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)" 
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)" />
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  comments: {
    quillEditor
  },
  data() {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: [
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
      ],
      s: "222"
    };
  },
  methods: {
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
    this.s = window.sessionStorage.getItem('rowIdToEdit');
    console.log(this.s);
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: calc(100vh - 90px);
}

.editor {
  background-color: white;
}
</style>