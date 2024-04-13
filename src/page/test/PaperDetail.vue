<script setup>

</script>

<template>
  <ElScrollbar class="test-detail" :always="true" @scroll="scrollCallback" :noresize="true">
    <div v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled()" :infinite-scroll-distance="500">
      <ElRow :gutter="20" style="margin: 0 10px 20px 10px" class="hidden-md-and-down">
        <ElCol :span="12">
          <QuestionCard v-for="question in left" :data="question.data" :order="question.order"></QuestionCard>
        </ElCol>
        <ElCol :span="12">
          <QuestionCard
              v-for="question in right"
              :data="question.data"
              :order="question.order"
          ></QuestionCard>
        </ElCol>
      </ElRow>
      <ElCol class="hidden-lg-and-up question-card-small">
        <QuestionCard v-for="question in all" :data="question.data" :order="question.order"></QuestionCard>
      </ElCol>
    </div>
  </ElScrollbar>
</template>

<style scoped lang="less">

</style>