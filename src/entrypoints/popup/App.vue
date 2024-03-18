<script setup lang="ts">
  import BlockSitesToggle from "@/components/blockSitesToggle.vue";
</script>

<template>
  <div id="popup">
    <BlockSitesToggle />
  </div>
</template>

<style>
  #popup {
    min-width: 470px;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 47px;
  }
</style>
