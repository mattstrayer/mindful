import { createApp } from "vue";

import "@/index.css";

import { useTabInfoStore } from "@/data/tabInfoStore";
import { BroadcastChannels, Message, MessageTypes } from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";

import App from "./App.vue";


const channel: BroadcastChannel<Message> = new BroadcastChannel(BroadcastChannels.default);

channel.onmessage = async (message) => {
  // preflight check to see if the message came from the current tab.
  // if so, discard it.
  const tabInfoStore = await useTabInfoStore();

  if (tabInfoStore.tab?.id === message.tabId) {
    console.log("message came from this tab, no-op");
    return;
  }

  switch (message.type) {
    case MessageTypes.domainsUpdated: {
      // only want to run this without posting a new message.
      // await useRepo(TaskRepository).save(message.data)
      break;
    }
  }
  console.log(message.type, message.data);
};

createApp(App).mount("#app");
