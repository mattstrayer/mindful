<script setup lang="ts">
import { useStore } from "~/store"

import AddIntention from "./addIntention.vue"
import IntentionListItem from "./intentionListItem.vue"

const store = useStore()
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl text-zinc-100 font-bold text-center">intentions</h1>

    <AddIntention />
    <IntentionListItem
      v-for="(intention, index) in store.intentions"
      :key="index"
      :intention="intention" />
  </div>
</template>
