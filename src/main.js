import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import api from './api/index.js'

const app = createApp(App)
app.config.globalProperties.$api = api
app.use(ElementPlus, { size: 'samll' })
app.use(store).use(router).mount('#app')
