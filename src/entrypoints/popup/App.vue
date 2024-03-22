<script setup lang="ts">
  import BlockSitesToggle from "@/components/blockSitesToggle.vue";
</script>

<template>
  <div id="popup" class="p-4">
    <BlockSitesToggle />
  </div>
</template>

<style>
  #popup {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 47px;
  }
</style>
