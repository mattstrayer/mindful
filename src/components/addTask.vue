<script setup lang="ts">
import { useRepo } from "pinia-orm"
import { ref } from "vue"

import TaskRepository from "~/repositories/taskRepository"

const input = ref("")

function didAddTask() {
  if (!input.value) return

  useRepo(TaskRepository).save({
    name: input.value
  })

  input.value = ""
}
</script>

<template>
  <div class="join">
    <input
      v-model="input"
      type="text"
      placeholder="I want to..."
      class="input input-bordered join-item w-full"
      @keyup.enter="didAddTask" />
    <button class="btn btn-primary join-item" @click="didAddTask">add</button>
  </div>
</template>
