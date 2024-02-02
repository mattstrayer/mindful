<script setup lang="ts">
import { useRepo } from "pinia-orm"

import { Task } from "../models"
import GradientBorder from "./gradientBorder.vue"

const props = defineProps({
  task: Task
})

const didChange = () => {
  if (props.task.completed) {
    useRepo(Task)
      .where("id", props.task.id)
      .update({ completed: false, completedAt: null })
  } else {
    useRepo(Task)
      .where("id", props.task.id)
      .update({ completed: true, completedAt: new Date() })
  }
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between items-center flex-row">
      <div class="flex flex-col leading-[3rem] text-base">
        <span class="inline-block"> {{ props.task.name }}</span>
      </div>
      <div class="flex flex-col">
        <input
          type="checkbox"
          :checked="props.task.completed"
          class="checkbox checkbox-lg"
          :class="{ 'checkbox-primary': props.task.completed }"
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
