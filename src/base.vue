<script setup lang="ts">
import "./index.css"

import { createPinia } from "pinia"
import { createORM, mapRepos, useRepo } from "pinia-orm"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { computed, getCurrentInstance, onMounted, ref } from "vue"

import AddTask from "./components/addTask.vue"
import BreathingAnimation from "./components/breathingAnimation.vue"
import TaskListItem from "./components/taskListItem.vue"
import TasksContainer from "./components/tasksContainer.vue"
import type { Intention } from "./models"
import SettingsPage from "./pages/settingsPage.vue"
import IntentionRepository from "./repositories/intentionRepository"
import TaskRepository from "./repositories/taskRepository"
import { useStore } from "./store"

const instance = getCurrentInstance()

const pinia = createPinia().use(createORM()).use(piniaPluginPersistedstate)

instance.appContext.app.use(pinia)

const settingsStore = useStore()

const store = mapRepos({
  tasks: TaskRepository,
  intentions: IntentionRepository
})

const todaySorted = computed(() => {
  return store.tasks().getTodaysTasks()
})

const showSettings = computed(() => {
  return settingsStore.displayUI
})

let intentionQueryOffset = 0

const displayIntention = ref({ name: "mindful" } as Intention)
function fetchNewIntention() {
  const intention = useRepo(IntentionRepository)
    .limit(1)
    .offset(intentionQueryOffset)
    .get()

  if (!intention.length) {
    if (intentionQueryOffset == 0) {
      // noting in the store.
      return
    }
    intentionQueryOffset = 0
    fetchNewIntention()
  } else {
    displayIntention.value = intention[0]
    intentionQueryOffset += 1
  }
}

onMounted(() => {
  fetchNewIntention()

  window.addEventListener("storage", (event: StorageEvent) => {
    // reload from localstorage
    store.tasks().piniaStore().$hydrate({ runHooks: false })
    store.intentions().piniaStore().$hydrate({ runHooks: false })
  })
})
</script>

<template>
  <div>
    <div class="w-full text-right text-zinc-500 pr-4 mt-4 text-xl">
      <button
        :class="{ 'text-zinc-100': showSettings }"
        @click="settingsStore.displayUI = !showSettings">
        settings
      </button>
    </div>

    <div class="container flex flex-col justify-center max-w-[600px] mx-auto">
      <SettingsPage v-if="showSettings" />
      <div v-else>
        <h1
          class="text-zinc-100 text-6xl text-center font-extrabold mb-4 line leading-snug">
          be

          <BreathingAnimation @completed-iteration="fetchNewIntention">
            {{ displayIntention.name }}
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

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.34s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
