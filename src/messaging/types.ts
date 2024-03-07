export enum BroadcastChannels {
  default = "mindful"
}

export type MessageHandler = (message: Message) => void

export enum MessageTypes {
  blockEnabled = "BLOCK_ENABLED"
}

export interface Message {
  type: MessageTypes
  data: any
}

export interface BlockEnabledMessage extends Message {
  type: MessageTypes.blockEnabled
  data: boolean
}
