import { defineStore } from "pinia"


// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application

export const useStore = defineStore("settings", {
  persist: {
  },
  state: () => {
    return {
      displayUI: false,
      settings: {},
    }
  },

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
