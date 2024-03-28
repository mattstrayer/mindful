import { useTabInfoStore } from "@/data/tabInfoStore";
import type { StoreUpdateMessage } from "../types";

export const messageHandler = async (message: StoreUpdateMessage) => {
	// preflight check to see if the message came from the current tab.
	// if so, discard it.
	const tabInfoStore = await useTabInfoStore();

	if (tabInfoStore.tab?.id === message.data.sourceTabId) {
		console.log("message came from this tab, no-op");
		return;
	}

	console.log(message.data.store, message.data.data);
};
