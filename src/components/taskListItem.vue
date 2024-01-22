<script setup lang="ts">
import { Task } from "../models"

const id = Math.random().toString(36).substring(2, 15)

const props = defineProps({
  task: Task
})
</script>

<template>
  <div class="form-control">
    <div class="join">
      <div class="flex input input-bordered join-item leading-[3rem]">
        <span class="inline-block"> {{ props.task.name }}</span>
      </div>

      <input
        type="checkbox"
        :checked="props.task.completed"
        class="btn checkbox join-item" />
    </div>
  </div>
</template>

<style>
.name {
  vertical-align: middle;
}
</style>
