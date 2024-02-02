<script setup lang="ts">
import { useStore } from "~/store"

import AddIntention from "./addIntention.vue"
import IntentionListItem from "./intentionListItem.vue"

const store = useStore()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="collapse bg-base-200 border-base-300 border collapse-arrow">
      <input type="checkbox" checked />
      <div
        class="collapse-title text-2xl font-medium text-zinc-100 text-center">
        intentions
      </div>
      <div class="collapse-content">
        <AddIntention class="mb-4" />
        <IntentionListItem
          v-for="(intention, index) in store.intentions"
          :key="index"
          :intention="intention" />
      </div>
    </div>
  </div>
</template>
