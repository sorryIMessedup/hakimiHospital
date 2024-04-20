<template>
  <div id="app">
    <br><br><br><br><br><br><br><br><br>
    <div class="chat-container" style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">
      <div class="chat-history">

        <ul>
          <li>
            <a class="btn btn-primary table-shadow" href="#">狗狗流眼泪是为什么 </a>
          </li>
          <li>
            <a class="btn btn-primary table-shadow" href="#">宠物狗出现口腔白斑怎么处理</a>
          </li>
          <li>
            <a class="btn btn-primary table-shadow" href="#">宠物猫皮肤出现红疹是什么情况</a>
          </li>
          <li>
            <a class="btn btn-primary table-shadow" href="#">宠物猫手术流程</a>
          </li>
        </ul>
      </div>
      <div class="chat-box">

        <div class="messages">
          <div v-for="(message, index) in messages" :key="`msg-${index}`" class="message">
            <span>{{ message.sender }}:</span> {{ message.content }}
          </div>
        </div>
        <div class="row">

          <div class="col">
            <input  v-model="newMessage" @keyup.enter="sendMessage" type="text" class="form-control input-round table-shadow" placeholder="输入宠物医学有关的问题">
          </div>
          <div class="col">
            <button @click="sendMessage" type="submit" class="btn btn-primary btn-round">submit</button>
          </div>
        </div>

      </div>
    </div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
export default {
  name: 'ChatInterface',
  data() {
    return {
      newMessage: '',
      messages: [],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          sender: 'User',
          content: this.newMessage,
        });
        this.newMessage = '';
        // 这里可以添加发送消息到后端的代码
      }
    },
  },
};
</script>

<style>
.table-shadow{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 8px; /* 可选：添加圆角效果 */
  overflow: hidden; /* 防止阴影被裁剪 */
}
#app {
  position: relative; /* 或者使用其他布局技术确保它占满整个视窗 */
  width: 100%;
  height: 90%;
}
.chat-container {
  position: absolute; /* 将聊天框固定在页面上 */
  top: 13%; /* 定位到页面的顶部 */
  right: 0%; /* 定位到页面的右侧 */
  bottom: 10%; /* 定位到页面的底部 */
  left: 0%; /* 定位到页面的左侧 */
  display: flex;
  max-width: 97%;
  max-height: 90%;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.chat-history {
  flex: 1;
  background-color: #f9f9f9;
  padding: 7px;
  overflow-y: auto;
}

.chat-box {
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保子元素在水平方向上居中 */
}
.row {
  display: flex;
  justify-content: center; /* 横向居中.row内的元素 */
  width: 80%; /* 确保.row占据整个.chat-box的宽度 */

}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.input-area {
  display: flex;
  padding: 10px;
}

.input-area input {
  flex: 1;
  margin-right: 10px;
  padding: 5px;
}

.input-area button {
  padding: 5px 10px;
}

.message span {
  font-weight: bold;
}
</style>
