declare enum BroadcastChannels {
  default = "mindful",
}

declare type MessageHandler = (message: Message) => void

declare type MessageTypes = "BLOCK_ENABLED"
declare interface Message  {
  type: MessageTypes;
  data: any;
};


declare interface BlockEnabled extends Message {
  type: "BLOCK_ENABLED";
  data: boolean
}

