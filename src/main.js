import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import App from "@/App.vue";
import router from "@/router";
import axios from "@/network";

const app = createApp(App);

// 将 axios 设置为全局变量
app.config.globalProperties.$axios = axios;
// 将 ElementPlus 的消息弹窗挂载为全局变量
app.config.globalProperties.$message = ElementPlus.$message;
app.use(ElementPlus, { locale });
app.use(router);
app.mount("#app");
