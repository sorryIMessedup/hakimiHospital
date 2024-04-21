<template>
  <div id="app">
    <br><br><br><br><br><br><br><br><br>
    <div class="chat-container" style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">
      <div class="chat-history">
        <div>
         <br>
          <img
              id="userAvatar"
              class="rounded-circle shadow mt-neg5 down"
              :src="'users/getCurrentAvatar'"
              @error="errorHandler"
              @click="triggerFileInput"
              width="70"
              v-show="showUserAvatar"
          >
          <img
              id="defaultAvatar"
              class="rounded-circle shadow mt-neg5 down"
              src="@/assets/img/10.png"
              @click="triggerFileInput"
              width="70"
              v-show="!showUserAvatar"
          >
          <p3><strong>宠物医院助手</strong></p3>
          <br><br><br><br><br>
        </div>

        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   您可以这么问:</p>
        <ul>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#" @click="fillInput('狗狗流眼泪是为什么')"><span class="text-indent">狗狗流眼泪是为什么</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#" @click="fillInput('宠物狗出现口腔白斑怎么处理')"><span class="text-indent">宠物狗出现口腔白斑怎么处理</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent"@click="fillInput('宠物猫皮肤出现红疹')">宠物猫皮肤出现红疹</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent" @click="fillInput('宠物猫手术流程')">宠物猫手术流程</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent" @click="fillInput('宠物狗都要打什么疫苗')">宠物狗都要打什么疫苗</span></a>
          </li>
          <li>
            <a class="btn btn-light table-shadow text-left" href="#"><span class="text-indent" @click="fillInput('宠物猫不安分怎么办')">宠物猫不安分怎么办</span></a>
          </li>

        </ul>
      </div>
      <div class="chat-box">

        <div class="messages">

          <div v-for="(message, index) in messages" :key="`msg-${index}`" class="message">
            <img class="rounded-circle shadow" :src="getAvatarSrc(message.sender)" width="30">
            <span>&nbsp;&nbsp;&nbsp;{{ message.sender }}:<br></span> <div class="message-bubble"><span v-html="message.content"></span></div>
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
import marked from 'marked';
import DOMPurify from 'dompurify';

export default {
  name: 'ChatInterface',
  data() {
    return {
      loader: new NetLoader("test"),
      newMessage: '',
      showUserAvatar: true,
      messages: [],
      user:""
    };
  },
  methods: {
    getAvatarSrc(sender) {
      if (sender === 'AI') {
        return require('@/assets/img/11.png');


      } else {
        if(this.showUserAvatar ) return 'users/getCurrentAvatar';
        else return require('@/assets/img/10.png')
      }
    },
    triggerFileInput() {
      // 触发文件输入
      this.$refs.fileInput.click();
    },errorHandler(event) {
      // 设置为本地图像路径
      this.showUserAvatar = false;
      console.log("用户头像不存在")
    },
    fillInput(message) {
      // 将按钮文本赋值给 newMessage
      this.messages.push({
        sender:'User',
        content:message
      });
      this.loader.post("chat/interact",{"text":message}).then(value => {
        console.log("发送信息")
        const rawHtml = marked(value.data);
        // 使用DOMPurify来清理HTML，确保它是安全的
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        this.messages.push({
          sender: 'AI',
          content: cleanHtml
        });
      })
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          sender: this.user,
          content: this.newMessage,
        });

        this.loader.post("chat/interact",{"text":this.newMessage}).then(value => {
          console.log("发送信息")
          const rawHtml = marked(value.data);
          // 使用DOMPurify来清理HTML，确保它是安全的
          const cleanHtml = DOMPurify.sanitize(rawHtml);
          this.messages.push({
            sender: 'AI',
            content: cleanHtml
          });
        })
        this.newMessage = '';
        // 这里可以添加发送消息到后端的代码
      }
    },
  },
  created() {
    this.loader.get("users/findCurrentUser").then(value => {
      this.user = value.data.data.username
    })
  }
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

  bottom: 10%;
  width: 90%;
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

.message-bubble {
  padding: 10px 20px; /* 内边距 */
  background-color: #f0f0f0; /* 背景色 */
  border-radius: 20px; /* 圆角边框 */
  border: 1px solid #ccc; /* 边框 */
  max-width: 60%; /* 最大宽度，根据需要调整 */
  word-wrap: break-word; /* 自动换行 */
  margin-bottom: 10px; /* 与下一个气泡的间距 */
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
.down{
  margin-top: 10px;
}
</style>
