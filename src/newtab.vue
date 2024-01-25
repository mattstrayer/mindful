<script setup lang="ts">
import "./index.css"

import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { getCurrentInstance } from "vue"

import AddTask from "./components/addTask.vue"
import RemindersSection from "./components/remindersSection.vue"
import TaskListItem from "./components/taskListItem.vue"
import TasksContainer from "./components/tasksContainer.vue"
import { useStore } from "./store"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const instance = getCurrentInstance()

instance.appContext.app.use(pinia)

const store = useStore()

// TODO:
// add watcher to store.
// when it changes push an event to the background service worker to persist
</script>

<template>
  <div class="container flex flex-col justify-center max-w-[600px] mx-auto">
    <h1
      class="text-zinc-100 text-6xl text-center font-extrabold mb-4 line leading-snug">
      <div
        class="animate-pulse animate-infinite animate-duration-[6000ms] animate-delay-1000 animate-ease-in-out">
        be
      </div>
      <div
        class="animate-pulse animate-infinite animate-duration-[6000ms] animate-delay-1000 animate-ease-in-out">
        mindful
      </div>
    </h1>

    <RemindersSection class="flex-1" :reminders="store.reminders" />

    <TasksContainer>
      <AddTask />

      <TaskListItem :task="task" v-for="task in store.tasks" class="flex-1" />
    </TasksContainer>
  </div>
</template>

<style>
#__plasmo {
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  height: 100%;
}
</style>
