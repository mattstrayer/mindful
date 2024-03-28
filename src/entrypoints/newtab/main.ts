import { createApp } from "vue";

import "@/index.css";

import { messageHandler } from "@/messaging/handlers/client";
import { BroadcastChannels, type StoreUpdateMessage } from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();

const channel: BroadcastChannel<StoreUpdateMessage> = new BroadcastChannel(
	BroadcastChannels.consume,
);

channel.onmessage = messageHandler;

createApp(App).use(pinia).mount("#app");
