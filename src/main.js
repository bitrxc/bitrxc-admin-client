import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
// 确保 element-plus 分页组件显示中文
import locale from "element-plus/lib/locale/lang/zh-cn";

import App from "@/App.vue";
import router from "@/router";
import mitt from "mitt";

const emitter = mitt();
const app = createApp(App);

// 使用 emitter 作为 event bus 进行非父子组件传参
app.config.globalProperties.emitter = emitter;
app.use(ElementPlus, { locale });
app.use(router);
app.mount("#app");
