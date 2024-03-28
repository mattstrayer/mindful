<script setup lang="ts">
import { useDomains } from "@/stores/local/domainsStore";

const store = useDomains();
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
        :checked="store.blockingEnabled.value"
        @change="store.blockingEnabled.value = !store.blockingEnabled.value"
      />
    </div>
  </div>
</template>
