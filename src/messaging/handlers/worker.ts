import { Stores, type StoreUpdateMessage } from "../types";
import { useDomains } from "@/stores/worker/domainsStore";

export const messageHandler = (message: StoreUpdateMessage) => {
	const domainsStore = useDomains();

	// preflight check to see if the message came from the current tab.
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
