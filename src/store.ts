import { defineStore } from 'pinia'
import { Task } from '~models'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application


export const useStore = defineStore('mindful', {

  persist: {
    afterRestore(context) {

      // transform entities from Pojos (plain old javascript  objects) to plain objects

      context.store.$state.tasks = context.store.$state.tasks.map((task) => {

      })

    },

  },
  state: () => {
    return {
      tasks: [
        Task.fromName('Take Landon Out'),
        Task.fromName('Meditate'),
      ] as Task[],
      intentions: ['positive', 'generous', 'accountable']

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
    },

  }
})
