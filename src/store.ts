import { defineStore } from "pinia"

import { Intention, Task } from "~/models"

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useStore = defineStore("mindful", {
  persist: {
    serializer: {
      deserialize: (value: string) => {
        const json = JSON.parse(value)

        // serialize tasks and intentions
        json.tasks = Task.fromObjects(json.tasks)
        json.intentions = Intention.fromObjects(json.intentions)
        return json
      },
      serialize: JSON.stringify
    }
  },
  state: () => {
    return {
      tasks: [] as Array<Task>,
      intentions: [
        new Intention({ name: "positive" }),
        new Intention({ name: "generous" }),
        new Intention({ name: "accountable" })
      ] as Array<Intention>
    }
  },

  getters: {
    allIntentions: (state) => state.intentions,
    todaysTasks: (state) => {
      return state.tasks.filter((task) => {
        return task?.createdAt?.toDateString() === new Date().toDateString()
      })
    },
    pastTasks: (state) => {
      return state.tasks.filter((task) => {
        return task?.createdAt?.toDateString() < new Date().toDateString()
      })
    }
  },
  actions: {
    addTask(task: Task) {
      this.tasks.push(task)
    },

    toggleTask(id: string) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed
          task.completedAt = task.completed ? new Date() : null
        }
        return task
      })
    }
  }
})
