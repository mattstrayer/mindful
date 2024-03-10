import { Task } from "@/models"

export enum BroadcastChannels {
  default = "mindful"
}

export type MessageHandler = (message: Message) => void

export enum MessageTypes {
  blockEnabled = "BLOCK_ENABLED",
  savedTask = "SAVED_TASK"
}

export interface Message {
  type: MessageTypes
  data: any
  tabId: number
}

export interface BlockEnabledMessage extends Message {
  type: MessageTypes.blockEnabled
  data: boolean
}

export interface SavedTaskMessage extends Message {
  type: MessageTypes.savedTask
  data: Task
}
