import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// Font Icon
import "@mdi/font/css/materialdesignicons.css";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Components
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);

app.use(createPinia());
app.use(vuetify).use(router);

app.mount("#app");
