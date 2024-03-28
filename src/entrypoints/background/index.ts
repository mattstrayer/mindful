import {
	BroadcastChannels,
	type StoreUpdateMessage,
	Stores,
} from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";

import TabObserverService from "@/services/tabObserverService";

import { useDomains } from "@/stores/worker/domainsStore";

export default defineBackground(async () => {
	const domainsStore = useDomains();

	// Register Browser Event Listeners
	browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler);

	// Setup Broadcast Channel to listen for messages on the publish channel
	// These are messages that the new-tab and popup clients will send
	const channel: BroadcastChannel<StoreUpdateMessage> = new BroadcastChannel(
		BroadcastChannels.publish,
	);

	channel.onmessage = (message: StoreUpdateMessage) => {
		// no special logic to look at the tabId needed here. The bg worker will always respond to messages

		switch (message.store) {
			case Stores.Domains:
				domainsStore.blockingEnabled.value = message.data.blockingEnabled;

				domainsStore.blocklist.value = message.data.blocklist;

				domainsStore.persistAndNotify();

				// if (domainsStore.blockingEnabled.value) {
				//   TabObserverService.findAndBlockTabs();
				// } else {
				//   TabObserverService.restoreAllTabs();
				// }
				break;
		}

		console.log(message.store, message.data);
	};
});
