<script setup lang="ts">
import BlockSitesToggle from "@/components/blockSitesToggle.vue"
import IntentionsList from "@/components/intentionsList.vue"
</script>

<template>
  <div>
    <h1
      class="text-zinc-100 text-6xl text-center font-extrabold mb-4 line leading-snug">
      settings
    </h1>
    <IntentionsList />

    <BlockSitesToggle />
  </div>
</template>

<style scoped></style>
