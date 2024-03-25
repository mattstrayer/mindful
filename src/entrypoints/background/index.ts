import { BroadcastChannels, Message, MessageTypes } from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";

import TabObserverService from "@/services/tabObserverService";

import { useDomains } from "@/workerStore";

export default defineBackground(async () => {
  const domainsStore = useDomains();
  console.log(domainsStore.blockingEnabled.value);

  domainsStore.add("example.com");

  const b = await browser.storage.local.get('domains')
  console.log(b)

  // Register Browser Event Listeners
  browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler);



  // Setup Broadcast Channel
  // const channel: BroadcastChannel<Message> = new BroadcastChannel(BroadcastChannels.default);

  // channel.onmessage = (message) => {
  //   // no special logic to look at the tabId needed here. The bg worker will always respond to messages
  //   switch (message.type) {
  //     case MessageTypes.blockEnabled:
  //       workerStore.blockingEnabled.value = message.data;

  //       if (message.data) {
  //         TabObserverService.findAndBlockTabs();
  //       } else {
  //         TabObserverService.restoreAllTabs();
  //       }
  //       break;
  //     case MessageTypes.blocklistUpdated:
  //         workerStore.blocklist.value = message.data;
  //         break;
  //   }

  //   console.log(message.type, message.data);
  // };
});
