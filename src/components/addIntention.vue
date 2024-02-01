<script setup lang="ts">
import { ref } from "vue"

import { Intention } from "~/models"

const input = ref("")

function didAddIntention() {
  if (!input.value) return

  Intention.fromName(input.value)

  input.value = ""
}
</script>

<template>
  <div class="join">
    <input
      v-model="input"
      type="text"
      placeholder="I intend to be... (enter to add)"
      class="input input-bordered join-item w-full"
      @keyup.enter="didAddIntention" />
    <button class="btn btn-primary join-item" @click="didAddIntention">
      add
    </button>
  </div>
</template>
