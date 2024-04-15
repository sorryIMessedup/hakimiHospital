import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import {store} from "@/store"
import "@/style/global.less"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // 引入样式
import 'quill/dist/quill.snow.css' // snow theme
import 'quill/dist/quill.bubble.css' // bubble theme
// import '@/style/tailwindcss.css'

Vue.config.productionTip = false
// axios.defaults.withCredentials = true

Vue.use(ElementUI);
Vue.use(VueQuillEditor);
new Vue({
  components: {
    App
  },
  router,store,
  render: h => h(App)
}).$mount('#app') //挂载节点
