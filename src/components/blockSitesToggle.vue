<script setup lang="ts">
  import { useSettings } from "@/settings";

  const settingsStore = useSettings();
</script>

<template>
  <div class="w-full text-center">
    <div class="form-control">
      <label class="label">
        <span class="text-zinc-300 text-xl font-extrabold mb-4 line leading-snug"
          >Block Distracting Sites</span
        >
      </label>
      <input
        type="checkbox"
        class="toggle toggle-primary mx-auto"
        :checked="settingsStore.blockingEnabled"
        @change="settingsStore.toggleBlocking()"
      />
    </div>
  </div>
</template>
