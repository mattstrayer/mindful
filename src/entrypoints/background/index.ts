import {
	BroadcastChannels,
	type StoreUpdateMessage,
	Stores,
} from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";

import TabObserverService from "@/services/tabObserverService";

import { messageHandler } from "@/messaging/handlers/worker";

export default defineBackground(async () => {
	// Register Browser Event Listeners
	browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler);

	// Setup Broadcast Channel to listen for messages on the publish channel
	// These are messages that the new-tab and popup clients will send
	const channel: BroadcastChannel<StoreUpdateMessage> = new BroadcastChannel(
		BroadcastChannels.publish,
	);

	channel.onmessage = messageHandler;
});
