<template>
  <article class="prose p-8 border-2 border-current rounded-lg">
    <h1 v-for="reminder in props.reminders" v-text="reminder" />
  </article>
</template>

<script setup lang="ts">
const props = defineProps({
  reminders: Array<string>
})
</script>
