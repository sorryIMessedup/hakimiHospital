<template>
  <div id="app">
    <br><br><br><br><br><br><br><br><br>
    <div class="chat-container" style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">
      <div class="chat-history">
        <div>
         <br>
          <img class="rounded-circle shadow" src="@/assets/img/10.png" width="50">
          <p3><strong>宠物医院助手</strong></p3>
          <br><br><br><br><br>
        </div>

        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   您可以这么问:</p>
        <ul>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent">狗狗流眼泪是为什么</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent">宠物狗出现口腔白斑怎么处理</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent">宠物猫皮肤出现红疹</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent">宠物猫手术流程</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent">宠物狗都要打什么疫苗</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent">宠物猫不安分怎么办</span></a>
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
import {NetLoader} from "@/net";

export default {
  name: 'ChatInterface',
  data() {
    return {
      loader: new NetLoader("test"),
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
  position: relative;
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保子元素在水平方向上居中 */

}
.row {
  align-self: flex-end; /* 将元素垂直对齐到容器的底部 */
  width: 80%; /* 确保.row占据整个.chat-box的宽度 */
  margin-bottom: 10px; /* 如果你想要.row距离.chat-box底部有间距 */
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

.chat-history ul {
  list-style-type: none; /* 移除列表项的默认样式 */
  padding: 0; /* 移除默认的内边距 */
}

.chat-history ul li {
  margin-bottom: 10px; /* 设置列表项之间的距离 */
}

.chat-history a.btn {
  display: block; /* 让<a>标签表现得像块级元素，允许我们设置宽度 */
  width: 90%; /* 设置<a>标签的固定宽度 */
  text-align: center; /* 文本居中 */
  padding: 10px 0; /* 增加一些内边距，让按钮看起来更大一些 */
}

.chat-history div {
  display: flex; /* 使用flex布局 */
  align-items: center; /* 垂直居中对齐 */
  padding-left: 20px; /* 增加左侧内边距，让整个内容离左侧更远一点 */
}
.text-left {
  text-align: left; /* 使文字左对齐 */
  margin-left: 20px; /* 增加左外边距，根据需要调整这个值 */}
.text-indent {
  display: inline-block; /* 使span表现得像块级元素，允许应用边距 */
  margin-left: 20px; /* 控制文字右移的距离 */
}



.chat-history img {
  margin-right: 20px; /* 图片右侧的外边距，让文字离图片更远一点 */
}
</style>
