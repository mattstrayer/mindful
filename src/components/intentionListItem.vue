<script setup lang="ts">
import type { Intention } from "@/data/types";
import { useIntentions } from "@/stores/intentionsStore";
import { ref } from "vue";

import GradientBorder from "./gradientBorder.vue";

const props = defineProps<{
	intention: Intention;
}>();

const showConfirmation = ref(false);

function didRemove() {
	if (showConfirmation.value === true) {
		const intentionsStore = useIntentions();
		intentionsStore.remove(props.intention?.id);

		showConfirmation.value = false;
	} else {
		showConfirmation.value = true;
	}
}
</script>

<template>
  <div class="flex flex-col w-full">
    <div class="flex justify-between items-center flex-row">
      <h1 class="flex flex-col leading-[3rem] text-base" v-text="intention?.name" />
      <button
        class="btn btn-sm flex flex-col"
        :class="{
          'btn-square': !showConfirmation,
          'btn-error': showConfirmation,
        }"
        @click="didRemove"
      >
        <span v-if="showConfirmation">confirm?</span>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <GradientBorder class="flex flex-row" />
  </div>
</template>
@/stores/local/intentionsStore
