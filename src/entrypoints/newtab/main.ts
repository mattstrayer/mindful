import { createApp } from 'vue';
import "@/index.css";
import { createPinia } from "pinia"
import { createORM } from "pinia-orm"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

import App from './App.vue';


const pinia = createPinia().use(createORM()).use(piniaPluginPersistedstate)


createApp(App).use(pinia).mount('#app');
