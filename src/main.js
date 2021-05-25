import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// 确保 element-plus 分页组件显示中文
import locale from "element-plus/lib/locale/lang/zh-cn";
import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);
app.use(ElementPlus, { locale });
app.config.productionTip = false;
app.use(Antd);
app.use(router);
app.mount("#app");
