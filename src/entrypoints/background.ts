import { BroadcastChannels, Message, MessageTypes } from "@/messaging/types"
import { useWorkerStore } from "@/workerStore"
import { BroadcastChannel } from "broadcast-channel"

import TabObserverService from "../services/tabObserverService"


export default defineBackground(() => {
  const workerStore = useWorkerStore()

  // Register Browser Event Listeners
  browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler)

  // Setup Broadcast Channel
  const channel: BroadcastChannel<Message> = new BroadcastChannel(
    BroadcastChannels.default
  )

  channel.onmessage = (message) => {
    switch (message.type) {
      case MessageTypes.blockEnabled:
        workerStore.blockingEnabled.value = message.data
        break
    }

    console.log(message.type, message.data)
  }
})
