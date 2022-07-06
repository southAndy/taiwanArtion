import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import drag from "v-drag";

//

createApp(App).use(Antd).use(drag).use(store).use(router).mount("#app");
