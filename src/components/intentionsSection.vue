<script setup lang="ts">
import type { Intention } from "~models"

export interface Props {
  intentions?: Array<Intention>
}

const props = withDefaults(defineProps<Props>(), {
  intentions: () => [] as Array<Intention>
})
</script>

<template>
  <article class="prose p-8 border-2 border-current rounded-lg">
    <h1
      v-for="(intention, index) in props.intentions"
      :key="index"
      v-text="intention?.name" />
  </article>
</template>
