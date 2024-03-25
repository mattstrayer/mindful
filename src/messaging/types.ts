import type { Domain, Task } from "@/data/types";

export enum BroadcastChannels {
  default = "mindful",
}



export type MessageHandler = (message: Message) => void;


export enum Stores {
  Domains,
  Tasks,
  Intentions
}
export interface StoreUpdateMessage {
  store: Stores
  data: any
  sourceTabId?: number
}

export interface DomainsUpdatedMessage {
  store: Stores.Domains
  data: {
    blocklist: Array<Domain>
    blockingEnabled: boolean
  }
}



export enum MessageTypes {
  blockEnabled = "BLOCK_ENABLED",
  savedTask = "SAVED_TASK",
  domainsUpdated = "DOMAINS_UPDATED",
}

export interface Message {
  type: MessageTypes;
  data: any;
  tabId?: number;
}

export interface BlockEnabledMessage extends Message {
  type: MessageTypes.blockEnabled;
  data: boolean;
}


export interface SavedTaskMessage extends Message {
  type: MessageTypes.savedTask;
  data: Task;
}
