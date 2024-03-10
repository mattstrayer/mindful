import { useTabInfoStore } from "@/data/tabInfoStore"
import type { Task } from "@/data/types"
import { generateUid } from "@/helpers"
import { SavedTaskMessage } from "@/messaging/types"
import { BroadcastChannel } from "broadcast-channel"
import { defineStore } from "pinia"

import { BroadcastChannels, MessageTypes } from "@/messaging/types"

// All interactions with the settings will be done via actions, so that we can dispatch
// a broadcast-channel message to the worker

export const useTasks = defineStore("tasks", {
  persist: true,
  state: () => {
    return {
      tasks: {} as Record<string, Task>
    }
  },

  getters: {
    todaysTasks: (state) => {
      const today = new Date().toDateString()


      const keys = Object.keys(state.tasks)

      // keys.sort((a, b) => {return countedVotes[a] - countedVotes[b]})
      let filteredPosts = keys.map(key => {
          return {[key]: countedVotes[key]}
      })

       Object.entries(state.tasks).filter(([_key, value]) => {
        return value.createdAt?.toDateString() === today
      })
      return state.tasks

    },
    taskForId: (state) => {
      return (id: string) => {
        return state.tasks[id]
      }
    }
  },
  actions: {
    async addTask(name: string, completed: boolean = false) {
      const tabInfo = await useTabInfoStore()

      const task = {} as Task
      task.id = generateUid()
      task.name = name
      task.completed = completed
      task.createdAt = new Date()

      this.tasks[task.id] = task

      new BroadcastChannel<SavedTaskMessage>(
        BroadcastChannels.default
      ).postMessage({
        tabId: tabInfo.tab?.id as number,
        type: MessageTypes.savedTask,
        data: task
      })
    }
  }
})
