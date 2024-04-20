<template>
  <div id="app">

    <br><br><br><br>
    <div class="table-shadow">
    <div id="chat-container" >
      <div id="messages" v-for="msg in messages" :key="msg.id">
        <p :class="{'user-message': msg.sender === 'user', 'gpt-message': msg.sender === 'gpt'}">{{ msg.text }}</p>
      </div>
    </div>
    <div class="row">
      <div class="input-group">
        <input type="text" class="form-control input-round table-shadow" placeholder="请输入宠物治疗相关的问题" v-model="userInput" @keyup.enter="sendMessage">
        <button type="submit" class="btn btn-primary btn-round" @click="sendMessage">提问</button>
      </div>

    </div>
  </div>


  </div>
</template>

<script>
import axios from 'axios';
import {NetLoader} from "@/net";

export default {
  name: 'App',
  data() {
    return {
      loader: new NetLoader("test"),
      userInput: '',
      messages: [],
      messageId: 0,
      keywords:[
        "我想了解狗狗的常见疾病和预防措施。",
        "猫咪应该多久洗一次澡？",
        "宠物兔子的饮食应该注意什么？",
        "我想预约明天下午3点的宠物体检。",
        "请问你们周末开门吗？我想预约一个宠物美容服务。",
        "我需要取消我宠物的预约，应该怎么操作？"
      ]
    };
  },
  methods: {
    sendMessage() {
      const text = this.userInput.trim();
      if (text) {
        this.addMessage(text, 'user');
        this.loader.post("chat/interact",{"text":text}, { timeout: 200000 }).then(response => {
          this.addMessage(response, 'gpt');
        })
            .catch(error => {
              console.error('There was an error!', error);
            });

      }
      this.userInput = ''; // Clear input after sending
    },
    addMessage(text, sender) {
      this.messages.push({ id: this.messageId++, text, sender });
    },
  },
};
</script>

<style>
#chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  height: 400px;
  overflow-y: auto;
}
.row{
  padding: 150px
}

#messages p {
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  max-width: 75%;
}

.user-message {
  background-color: #007bff;
  color: white;
  align-self: flex-end;
}

.gpt-message {
  background-color: #e9ecef;
  color: black;
  align-self: flex-start;
}

input {
  width: calc(100% - 90px);
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
}
.table-shadow{
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 8px; /* 可选：添加圆角效果 */
  overflow: hidden; /* 防止阴影被裁剪 */

}
button {
  width: 80px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}


</style>
