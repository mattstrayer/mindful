<script setup lang="ts">
import { Task } from "../models"
import GradientBorder from "./gradientBorder.vue"

const props = defineProps({
  task: Task
})

const didChange = () => {
  props.task.toggle()
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
