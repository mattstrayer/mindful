<script setup lang="ts">
export interface Props {
  intentions?: Array<string>
}

const props = withDefaults(defineProps<Props>(), {
  intentions: () => []
})
</script>

<template>
  <article class="prose p-8 border-2 border-current rounded-lg">
    <h1
      v-for="(intention, index) in props.intentions"
      :key="index"
      v-text="intention" />
  </article>
</template>
