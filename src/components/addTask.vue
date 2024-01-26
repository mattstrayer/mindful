<template>
  <div class="join">
    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered join-item w-full"
      v-model="input"
      @keyup.enter="didAddTask" />
    <button class="btn btn-primary join-item" @click="didAddTask">add</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { useStore } from "../store"

const input = ref("")

const store = useStore()

function didAddTask() {
  if (!input.value) return
  store.addTask(input.value)

  input.value = ""
}
</script>
