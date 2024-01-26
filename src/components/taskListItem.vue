<script setup lang="ts">
import { Task } from "../models"

const props = defineProps({
  task: Task
})
</script>

<template>
  <div class="flex justify-between items-center flex-row">
    <div class="flex flex-col input input-bordered leading-[3rem]">
      <span class="inline-block"> {{ props.task.name }}</span>
    </div>
    <div class="flex flex-col">
      <input
        type="checkbox"
        :checked="props.task.completed"
        class="checkbox checkbox-lg"
        :class="{ 'checkbox-primary': props.task.completed }"
        @change="task.toggle" />
    </div>
  </div>
</template>

<style>
.name {
  vertical-align: middle;
}
</style>
