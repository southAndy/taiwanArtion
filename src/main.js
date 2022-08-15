import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// ant-design
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//

createApp(App).use(Antd).use(store).use(router).mount("#app");
