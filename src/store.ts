import { defineStore } from 'pinia'
import { Task } from '~models'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application


export const useStore = defineStore('mindful', {

  persist: true,
  state: () => {
    return {
      tasks: [
        new Task('Take Landon Out'),
        new Task('Meditate'),
      ] ,
      reminders: ['positive', 'generous', 'accountable']
    }
  },
  actions: {

    addTask(name: string) {
      const task = { id: this.tasks.length + 1, name, completed: false, createdAt: new Date()}

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
