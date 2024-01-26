import { defineStore } from "pinia"
// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

import superjson from "superjson"

import { Task, Intention } from "~models"

export const useStore = defineStore("mindful", {
  persist: {
    serializer: {
      deserialize: superjson.parse,
      serialize: superjson.stringify
    },

    afterRestore(context) {
      // transform entities from Pojos (plain old javascript  objects) to plain objects
      // add defaults here
      const defaults = [
        {
          completed: false,
          createdAt: "2024-01-26T04:56:35.000Z",
          completedAt: null,
          id: "e18a0c8a-8cb9-4de6-89dd-77a330c57601",
          name: "Take Landon Out"
        },
        {
          completed: false,
          createdAt: "2024-01-26T04:56:35.000Z",
          completedAt: null,
          id: "3900ad1b-4c51-45e8-893e-32acc08bf68c",
          name: "Meditate"
        }
      ]
      if (context.store.$state.tasks) {
        context.store.$state.tasks = Task.fromObjects(
          context.store.$state.tasks
        )
      } else {
        context.store.$state.tasks = Task.fromObjects(defaults)
      }
    }
  },
  state: () => {
    return {
      tasks: [] as Task[],
      intentions: [new Intention({name:"positive"}), new Intention({name:"generous"}), new Intention({name: "accountable"})] as Array<Intention>
    }
  },
  actions: {
    addTask(task: Task) {
      this.tasks.push(task)
      console.log(this.tasks)
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
