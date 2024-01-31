<script setup lang="ts">
import { useStore } from "~/store"

import { Intention } from "../models"
import GradientBorder from "./gradientBorder.vue"

const props = defineProps({
  intention: Intention
})

const didRemove = () => {
  useStore().removeIntention(props.intention?.id)
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between items-center flex-row">
      <h1
        class="flex flex-col leading-[3rem] text-base"
        v-text="intention?.name" />
      <button class="btn btn-square btn-sm flex flex-col" @click="didRemove">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <GradientBorder class="flex flex-row" />
  </div>
</template>
