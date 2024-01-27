<script setup lang="ts">
import { ref } from "vue"

import { Task } from "~/models"

const input = ref("")

function didAddTask() {
  if (!input.value) return

  Task.fromName(input.value)

  input.value = ""
}
</script>

<template>
  <div class="join">
    <input
      v-model="input"
      type="text"
      placeholder="I want to... (enter to add)"
      class="input input-bordered join-item w-full"
      @keyup.enter="didAddTask" />
    <button class="btn btn-primary join-item" @click="didAddTask">add</button>
  </div>
</template>
