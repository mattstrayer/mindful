import { BroadcastChannel } from "broadcast-channel"
import { defineStore } from "pinia"

import {
  BlockEnabledMessage,
  BroadcastChannels,
  MessageTypes
} from "./messaging/types"

// All interactions with the settings will be done via actions, so that we can dispatch
// a broadcast-channel message to the worker

export const useSettings = defineStore("settings", {
  persist: true,
  state: () => {
    return {
      blockingEnabled: true,
    }
  },
  actions: {
    toggleBlocking() {
      this.blockingEnabled = !this.blockingEnabled
      new BroadcastChannel<BlockEnabledMessage>(
        BroadcastChannels.default
      ).postMessage({
        type: MessageTypes.blockEnabled,
        data: this.blockingEnabled
      })
    }
  }

  // getters: {
  //   allIntentions: (state) => state.intentions,
  //   todaysTasks: (state) => {
  //     return state.tasks.filter((task) => {
  //       return task?.createdAt?.toDateString() === new Date().toDateString()
  //     })
  //   },
  //   pastTasks: (state) => {
  //     return state.tasks.filter((task) => {
  //       return task?.createdAt?.toDateString() < new Date().toDateString()
  //     })
  //   }
})
