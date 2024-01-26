<script setup lang="ts">
const props = defineProps({
  intentions: Array<string>
})
</script>

<template>
  <article class="prose p-8 border-2 border-current rounded-lg">
    <h1 v-for="intention in props.intentions" v-text="intention" />
  </article>
</template>
