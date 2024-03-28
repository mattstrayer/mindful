import type { Domain } from "@/data/types";
import { generateUid } from "@/helpers";
import {
	BroadcastChannels,
	type DomainsUpdatedMessage,
	Stores,
} from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";
import { useDomainsState } from "../states";

export const useDomains = () => {
	const storageKey = "domains";

	const { blocklist, blockingEnabled } = useDomainsState();

	// Getters

	// watchers on state

	// watch(blocklist, async (newBlocklist, oldBlocklist) => {
	//   persistAndNotify()
	// })

	// watch(blockingEnabled, async (newValue, oldValue) => {
	//   persistAndNotify()
	// })

	// Helpers

	function persist() {
		browser.storage.local.set({
			[storageKey]: {
				blockingEnabled: blockingEnabled.value,
				blocklist: blocklist.value,
			},
		});
	}

	async function persistAndNotify() {
		console.log("persist and notify!");
		await persist();

		await new BroadcastChannel<DomainsUpdatedMessage>(
			BroadcastChannels.consume,
		).postMessage({
			store: Stores.Domains,
			data: {
				blocklist: toRaw(blocklist.value),
				blockingEnabled: toRaw(blockingEnabled.value),
			},
		});
	}

	// Actions

	async function add(url: string) {
		const domain = {} as Domain;
		domain.id = generateUid();
		domain.domain = url;

		blocklist.value.push(domain);
		persistAndNotify();
	}

	function remove(id: string) {
		const index = blocklist.value.findIndex((domain) => domain.id === id);
		if (index > -1) {
			blocklist.value.splice(index, 1);
		}
		persistAndNotify();
	}

	return {
		blocklist,
		blockingEnabled,
		add,
		remove,
		persistAndNotify,
	};
};
