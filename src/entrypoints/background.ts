import TabObserverService from "../services/tabObserverService"
import { BroadcastChannel } from 'broadcast-channel';
import { Message, BroadcastChannels } from "@/messaging/types"

export default defineBackground( () => {


  // Register Browser Event Listeners
  browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler)


  // Setup Broadcast Channel
  const channel: BroadcastChannel<Message> = new BroadcastChannel(BroadcastChannels.default);


  channel.onmessage = (message) => {

    console.log(message.type, message.data)
  }
});
