<script setup lang="ts">
import { useRepo } from "pinia-orm"
import { ref } from "vue"

import IntentionRepository from "~/repositories/intentionRepository"

const input = ref("")

function didAddIntention() {
  if (!input.value) return

  useRepo(IntentionRepository).save({
    name: input.value
  })

  input.value = ""
}
</script>

<template>
  <div class="join w-full">
    <input
      v-model="input"
      type="text"
      placeholder="I intend to be..."
      class="input input-bordered join-item w-full"
      @keyup.enter="didAddIntention" />
    <button class="btn btn-primary join-item" @click="didAddIntention">
      add
    </button>
  </div>
</template>
