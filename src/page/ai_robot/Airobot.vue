<template>
  <div class="qa-component">
    <>
    <h2>问答机器人</h2>
    <input v-model="question" @keyup.enter="getAnswer" placeholder="请输入你的问题" />
    <button @click="getAnswer">提交</button>
    <p>回答: {{ answer }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      question: '',
      answer: '请提出你的问题！',
    };
  },
  methods: {
    getAnswer() {
      if (this.question.trim() === '') {
        this.answer = '问题不能为空！';
        return;
      }
      this.answer = '这是一个静态回答，后续可以集成真实的AI逻辑。';
      // 在这里，你可以添加调用后端API的逻辑来获取真实的回答
    },
  },
};
</script>

<style scoped>
.qa-component {
  text-align: center;
  margin-top: 20px;
}
</style>