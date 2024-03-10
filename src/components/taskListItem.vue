<script setup lang="ts">
import { Task } from "@/data/types"
import { useTasks } from "@/stores/tasksStore"

import GradientBorder from "./gradientBorder.vue"

const tasksStore = useTasks()

const props = defineProps<{
  taskId: string
}>()

let task = {} as Task

onMounted(() => {
  task = tasksStore.find(props.taskId)
})

const didChange = () => {
  if (task.completed) {
    task.completed = false
    task.completedAt = undefined
  } else {
    task.completed = true
    task.completedAt = new Date()
  }

  useTasks().saveTask(task)
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between items-center flex-row">
      <div class="flex flex-col leading-[3rem] text-base">
        <span class="inline-block"> {{ task?.name }}</span>
      </div>
      <div class="flex flex-col">
        <input
          type="checkbox"
          :checked="task?.completed"
          class="checkbox checkbox-lg"
          :class="{ 'checkbox-primary': task?.completed }"
          @change="didChange" />
      </div>
    </div>

    <GradientBorder class="flex flex-row" />
  </div>
</template>

<style>
.name {
  vertical-align: middle;
}
</style>
