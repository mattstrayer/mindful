<script setup lang="ts">
  import { useTasks } from "@/stores/tasksStore";
  import { ref } from "vue";

  const input = ref("");

  function didAddTask() {
    if (!input.value) return;
    const tasksStore = useTasks();

    tasksStore.add(input.value);

    input.value = "";
  }
</script>

<template>
  <div class="join">
    <input
      v-model="input"
      type="text"
      placeholder="I want to..."
      class="input input-bordered join-item w-full"
      @keyup.enter="didAddTask"
    />
    <button class="btn btn-primary join-item" @click="didAddTask">add</button>
  </div>
</template>
