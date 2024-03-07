<script setup lang="ts">
import { useSettings } from "@/settings"

const settingsStore = useSettings()
</script>

<template>
  <div class="w-full text-right text-zinc-500 pr-4 mt-4 text-xl">
    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">Block Distracting Sites</span>
        <input
          type="checkbox"
          class="toggle toggle-primary"
          :checked="settingsStore.blockingEnabled"
          @change="settingsStore.toggleBlocking()" />
      </label>
    </div>
  </div>
</template>
