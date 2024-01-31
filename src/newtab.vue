<script setup lang="ts">
import "./index.css"

import { MotionPlugin } from "@vueuse/motion"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { computed, getCurrentInstance, ref } from "vue"

import { Task } from "~/models"

import AddTask from "./components/addTask.vue"
import BreathingAnimation from "./components/breathingAnimation.vue"
import TaskListItem from "./components/taskListItem.vue"
import TasksContainer from "./components/tasksContainer.vue"
import SettingsPage from "./pages/settingsPage.vue"
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

const displayedIntention = ref(store.intentions[0]?.name || "mindful")

function updateDisplayedIntention() {
  const index = store.intentions.findIndex(
    (intention) => intention?.name === displayedIntention.value
  )

  const nextIntention = store.intentions[index + 1] || store.intentions[0]
  if (nextIntention) {
    displayedIntention.value = nextIntention.name
  }
}
</script>

<template>
  <div>
    <div class="w-full text-right text-zinc-500 pr-4 mt-4 text-xl">
      <button
        :class="{ 'text-zinc-100': store.showSettings }"
        @click="store.toggleSettingsDisplay">
        settings
      </button>
    </div>

    <div class="container flex flex-col justify-center max-w-[600px] mx-auto">
      <SettingsPage v-if="store.showSettings" />
      <div v-else>
        <h1
          class="text-zinc-100 text-6xl text-center font-extrabold mb-4 line leading-snug">
          be

          <BreathingAnimation @completed-iteration="updateDisplayedIntention">
            {{ displayedIntention }}
          </BreathingAnimation>
        </h1>

        <TasksContainer class="pb-8">
          <h1
            class="text-3xl text-zinc-100 font-extrabold flex-1 text-center mb-8">
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

          <h1
            class="text-3xl text-zinc-100 font-extrabold flex-1 text-center mb-8 mt-8">
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
    </div>
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
