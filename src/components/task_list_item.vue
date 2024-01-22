<script setup lang="ts">
import { Task } from "../models"

const id = Math.random().toString(36).substring(2, 15)

const props = defineProps({
  task: Task
})
</script>

<template>
  <div class="task-list-item"></div>
</template>

<style></style>
