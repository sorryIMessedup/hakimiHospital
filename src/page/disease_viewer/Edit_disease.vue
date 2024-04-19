<template>
  <div class="container">
    {{ s }}
    <div class="editor">
      <quill-editor 
        ref="myQuillEditor" 
        v-model="content" 
        :options="editorOption" 
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)" 
        @ready="onEditorReady($event)" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      s: "222"
    };
  },
  methods: {
  },
  props: {},
  created() {
    this.s = window.sessionStorage.getItem('rowIdToEdit');
    console.log(this.s);
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