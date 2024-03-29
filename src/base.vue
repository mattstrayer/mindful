<script setup lang="ts">
  import "./index.css";

  import { computed, onMounted, ref } from "vue";

  import AddTask from "./components/addTask.vue";
  import BreathingAnimation from "./components/breathingAnimation.vue";
  import TaskListItem from "./components/taskListItem.vue";
  import TasksContainer from "./components/tasksContainer.vue";
  import { Intention } from "./data/types";
  import SettingsPage from "./pages/settingsPage.vue";
  import { useSettings } from "./settings";
  import { useIntentions } from "./stores/intentionsStore";
  import { useTasks } from "./stores/tasksStore";

  const settingsStore = useSettings();
  const tasksStore = useTasks();
  const intentionsStore = useIntentions();

  const currentIntention = ref(0);

  const showSettings = ref(false);

  const displayIntention = computed(() => {
    const mindful = { name: "mindful" } as Intention;

    if (!intentionsStore.intentions.length) {
      return mindful;
    }

    return intentionsStore.intentions[currentIntention.value];
  });

  function fetchNewIntention() {
    if (currentIntention.value >= intentionsStore.intentions.length - 1) {
      currentIntention.value = 0;
    } else {
      currentIntention.value++;
    }
  }

  onMounted(() => {
    fetchNewIntention();

    // cleanup on startup
    tasksStore.cleanupOldTasks();

    window.addEventListener("storage", () => {
      // reload from localstorage
      tasksStore.$hydrate();
      intentionsStore.$hydrate();
      settingsStore.$hydrate();
    });

    // document.addEventListener("visibilitychange", () => {
    //   if (document.visibilityState === "visible") {
    //     tasksStore.$hydrate()
    //     intentionsStore.$hydrate()
    //     settingsStore.$hydrate()
    //   }
    // })
  });
</script>

<template>
  <div>
    <div class="w-full text-right text-zinc-500 pr-4 mt-4 text-xl">
      <button :class="{ 'text-zinc-100': showSettings }" @click="showSettings = !showSettings">
        settings
      </button>
    </div>

    <div class="container flex flex-col justify-center max-w-[600px] mx-auto">
      <SettingsPage v-if="showSettings" />
      <div v-else>
        <h1 class="text-zinc-100 text-6xl text-center font-extrabold mb-4 line leading-snug">
          be

          <BreathingAnimation @completed-iteration="fetchNewIntention">
            {{ displayIntention.name }}
          </BreathingAnimation>
        </h1>

        <TasksContainer class="pb-8">
          <h1 class="text-3xl text-zinc-100 font-extrabold flex-1 text-center mb-8">Today</h1>

          <AddTask class="mb-12" />

          <TransitionGroup name="list" tag="div">
            <TaskListItem
              v-for="task of tasksStore.todaysTasks"
              :key="task.id"
              :task="task"
              class="flex-1"
            />
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
./stores/tasksStore
