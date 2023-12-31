import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createVuetify } from "vuetify/lib/framework.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";
import { createRouter, createWebHashHistory } from "vue-router";
import User from "../src/pages/User.vue";
import HelloWorld from "../src/pages/HelloWorld.vue";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
  },
  components,
  directives,
  theme: {
    defaultTheme: "dark",
  },
});

const routes = [
  {
    path: "/",
    component: HelloWorld,
  },
  {
    path: "/users/:id?",
    component: User,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).use(vuetify).mount("#app");