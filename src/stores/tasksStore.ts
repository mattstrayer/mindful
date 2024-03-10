import { useTabInfoStore } from "@/data/tabInfoStore"
import type { Task } from "@/data/types"
import { generateUid } from "@/helpers"
import {
  BroadcastChannels,
  MessageTypes,
  SavedTaskMessage
} from "@/messaging/types"
import { BroadcastChannel } from "broadcast-channel"
import { defineStore } from "pinia"

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

      return  Object.values(state.tasks).filter((task) => {
        const createdAt = new Date(task.createdAt!).toDateString()
        return createdAt === today
      }).sort((a: Task, b: Task) => {
        if (a.completed && b.completed) {
          return 0
        }
        if (a.completed) {
          return 1
        }
        if (b.completed) {
          return -1
        }
        return 0
      })

    },

    find: (state) => {
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
    },

    async saveTask(task: Task) {
      this.tasks[task.id] = task
    }
  }
})

