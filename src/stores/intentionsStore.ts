// import { useTabInfoStore } from "@/data/tabInfoStore"
import type { Intention } from "@/data/types";
import { generateUid } from "@/helpers";
// import { SavedTaskMessage } from "@/messaging/types"
// import { BroadcastChannel } from "broadcast-channel"
import { defineStore } from "pinia";

// import { BroadcastChannels, MessageTypes } from "@/messaging/types"

// All interactions with the settings will be done via actions, so that we can dispatch
// a broadcast-channel message to the worker

export const useIntentions = defineStore("intentions", {
  persist: true,
  state: () => {
    return {
      intentions: [] as Array<Intention>,
    };
  },

  getters: {},
  actions: {
    addIntention(name: string) {
      // const tabInfo = await useTabInfoStore()

      const intention = {} as Intention;
      intention.id = generateUid();
      intention.name = name;

      this.intentions.push(intention);

      // new BroadcastChannel<SavedTaskMessage>(
      //   BroadcastChannels.default
      // ).postMessage({
      //   tabId: tabInfo.tab?.id as number,
      //   type: MessageTypes.savedTask,
      //   data: task
      // })
    },

    removeIntention(name: string) {
      const index = this.intentions.findIndex((intention) => intention.name === name);
      if (index > -1) {
        this.intentions.splice(index, 1);
      }

      // new BroadcastChannel<SavedTaskMessage>(
      //   BroadcastChannels.default
      // ).postMessage({
      //   tabId: tabInfo.tab?.id as number,
      //   type: MessageTypes.savedTask,
      //   data: task
      // })
    },
  },
});
