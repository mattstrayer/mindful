<template>
  <div class="join">
    <input
      type="text"
      placeholder="Type here"
      class="input input-bordered join-item w-full max-w-xs"
      v-model="input" />
    <button class="btn btn-primary join-item" @click="didPressAdd">add</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { useStore } from "../store"

const input = ref("")

const store = useStore()

function didPressAdd() {
  store.addTask(input.value)

  input.value = ""
}
</script>
