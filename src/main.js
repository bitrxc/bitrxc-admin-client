import { createApp } from "vue";
import {
  ElInput,
  ElSelect,
  ElOption,
  ElTable,
  ElTableColumn,
  ElMessage
} from "element-plus";

import "element-plus/lib/theme-chalk/index.css";
import App from "@/App.vue";
import router from "@/router";

const app = createApp(App);

app.use(ElInput);
app.use(ElSelect);
app.use(ElOption);
app.use(ElTable);
app.use(ElTableColumn);
app.use(ElMessage);

app.use(router);
app.mount("#app");
