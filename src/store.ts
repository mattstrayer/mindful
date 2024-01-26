import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application


export const useStore = defineStore('mindful', {

  persist: true,
  state: () => {
    return {
      tasks: [{
        id: 1,
        name: "I really need to do this task!",
        completed: false
      },
      {
        id: 2,
        name: "this one is a little less pressing, so ofc i finished it first",
        completed: true
      }] ,
      reminders: ['positive', 'generous', 'accountable']
    }
  },
  actions: {

    addTask(name: string) {
      const task = { id: this.tasks.length + 1, name, completed: false, createdAt: new Date()}

      this.tasks.push(task)

    }
  }
})
