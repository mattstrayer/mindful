<script setup lang="ts">
import "./index.css"

import { MotionPlugin } from "@vueuse/motion"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { computed, getCurrentInstance } from "vue"

import { Task } from "~/models"

import AddTask from "./components/addTask.vue"
import IntentionsSection from "./components/intentionsSection.vue"
import TaskListItem from "./components/taskListItem.vue"
import TasksContainer from "./components/tasksContainer.vue"
import { useStore } from "./store"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const instance = getCurrentInstance()

instance.appContext.app.use(pinia)
instance.appContext.app.use(MotionPlugin)

const store = useStore()

const pastSorted = computed(() => {
  return Task.sorted(store.pastTasks)
})

const todaySorted = computed(() => {
  return Task.sorted(store.todaysTasks)
})
</script>

<template>
  <div class="container flex flex-col justify-center max-w-[600px] mx-auto">
    <h1
      class="text-zinc-100 text-6xl text-center font-extrabold mb-4 line leading-snug">
      <div
        class="animate-pulse animate-infinite animate-duration-[6000ms] animate-delay-1000 animate-ease-in-out">
        be
      </div>
      <!-- TODO: use vue motion here  https://github.com/vueuse/motion -->
      <!-- this div should actually take in the 3 reminders and should be animated -->
      <!-- be: mindful as the default, and then let the user add in the other x amount of reminders -->
      <div
        class="animate-pulse animate-infinite animate-duration-[6000ms] animate-delay-1000 animate-ease-in-out">
        mindful
      </div>
    </h1>

    <IntentionsSection class="flex-1" :intentions="store.allIntentions" />

    <TasksContainer>
      <h1 class="text-3xl text-zinc-100 font-extrabold flex-1 text-center mb-8">
        Today
      </h1>

      <AddTask class="mb-12" />

      <TransitionGroup name="list" tag="div">
        <TaskListItem
          v-for="task in todaySorted"
          :key="task.id"
          :task="task"
          class="flex-1" />
      </TransitionGroup>

      <h1 class="text-3xl text-zinc-100 font-extrabold flex-1 text-center mb-8">
        Past
      </h1>

      <TransitionGroup name="list" tag="div">
        <TaskListItem
          v-for="task in pastSorted"
          :key="task.id"
          :task="task"
          class="flex-1" />
      </TransitionGroup>

      <!-- make this collapsable  -->
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
