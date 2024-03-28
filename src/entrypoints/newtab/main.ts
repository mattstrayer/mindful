import { createApp } from "vue";

import "@/index.css";

import { messageHandler } from "@/messaging/handlers/client";
import { BroadcastChannels, type StoreUpdateMessage } from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";
import App from "./App.vue";

const channel: BroadcastChannel<StoreUpdateMessage> = new BroadcastChannel(
	BroadcastChannels.consume,
);

channel.onmessage = messageHandler;

createApp(App).mount("#app");
