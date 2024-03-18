<script setup lang="ts">
  import BlockSitesToggle from "@/components/blockSitesToggle.vue";
  import IntentionsList from "@/components/intentionsList.vue";
  import TaskListItem from "@/components/taskListItem.vue";
  import { useTasks } from "@/stores/tasksStore";

  const tasksStore = useTasks();
</script>

<template>
  <div>
    <h1 class="text-zinc-100 text-6xl text-center font-extrabold mb-4 line leading-snug">
      settings
    </h1>
    <IntentionsList />

    <h1 class="text-zinc-100 text-6xl text-center font-extrabold mb-4 line leading-snug">
      yesterday's tasks
    </h1>

    <!-- TODO: the click action on a list item here should be to reset the task to today -->

    <TaskListItem
      v-for="task of tasksStore.yesterdaysIncompleteTasks"
      :key="task.id"
      :task="task"
    />

    <BlockSitesToggle />
  </div>
</template>

<style scoped></style>
