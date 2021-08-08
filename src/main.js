import { createApp } from "vue";
import { Button, Input, Layout, Menu } from "ant-design-vue";
import "ant-design-vue/lib/button/style/css";
import "ant-design-vue/lib/input/style/css";
import "ant-design-vue/lib/layout/style/css";
import "ant-design-vue/lib/menu/style/css";
import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);
app.use(Button);
app.use(Input);
app.use(Layout);
app.use(router);
app.use(Menu);
app.mount("#app");
