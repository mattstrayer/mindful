import { BroadcastChannels, Message, MessageTypes, StoreUpdateMessage, Stores } from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";

import TabObserverService from "@/services/tabObserverService";

import { useDomains } from "@/stores/worker/domainsStore";

export default defineBackground(async () => {
  const domainsStore = useDomains();
  console.log(domainsStore.blockingEnabled.value);

  domainsStore.add("example.com");

  const b = await browser.storage.local.get("domains");
  console.log(b);

  // Register Browser Event Listeners
  browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler);

  // Setup Broadcast Channel to listen for messages on the publish channel
  // These are messages that the new-tab and popup clients will send
  const channel: BroadcastChannel<StoreUpdateMessage> = new BroadcastChannel(BroadcastChannels.publish);

  channel.onmessage = (message) => {
    // no special logic to look at the tabId needed here. The bg worker will always respond to messages

    switch(message.store) {
      case Stores.Domains:
        if(message.data.blockingEnabled) {
          domainsStore.blockingEnabled.value = message.data.blockingEnabled;
        }

        domainsStore.blocklist = message.data.blocklist

        if (domainsStore.blockingEnabled.value) {
          TabObserverService.findAndBlockTabs();
        } else {
          TabObserverService.restoreAllTabs();
        }
        break;

    }

    console.log(message.store, message.data);
  };
});
