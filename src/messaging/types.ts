import type { Domain, DomainsState, Task } from "@/data/types";

export enum BroadcastChannels {
	publish = "publish",
	consume = "consume",
}

export type MessageHandler = (message: StoreUpdateMessage) => void;

export enum Stores {
	Domains = 0,
	Tasks = 1,
	Intentions = 2,
}
export interface StoreUpdateMessage {
	store: Stores;
	data: DomainsState;
	sourceTabId?: number;
}

export interface DomainsUpdatedMessage {
	store: Stores.Domains;
	data: {
		blocklist: Array<Domain>;
		blockingEnabled: boolean;
	};
}
