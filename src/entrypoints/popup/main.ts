import { createApp } from "vue";

import "@/index.css";

import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";

const pinia = createPinia().use(piniaPluginPersistedstate);

createApp(App).use(pinia).mount("#app");
