import TabObserverService from "../services/tabObserverService"
import { BroadcastChannel } from 'broadcast-channel';


export default defineBackground( () => {


  // Register Browser Event Listeners
  browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler)


  // Setup Broadcast Channel
  const channel: BroadcastChannel<Message> = new BroadcastChannel('mindful');


  channel.onmessage = (message) => {
    console.log(message.type, message.data)
  }
});
