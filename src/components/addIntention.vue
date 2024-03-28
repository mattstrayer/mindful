<script setup lang="ts">
import { useIntentions } from "@/stores/intentionsStore";
import { ref } from "vue";

const input = ref("");

function didAddIntention() {
	if (!input.value) return;

	const intentionsStore = useIntentions();

	intentionsStore.add(input.value);

	input.value = "";
}
</script>

<template>
  <div class="join w-full">
    <input
      v-model="input"
      type="text"
      placeholder="I intend to be..."
      class="input input-bordered join-item w-full"
      @keyup.enter="didAddIntention"
    />
    <button class="btn btn-primary join-item" @click="didAddIntention">add</button>
  </div>
</template>
@/stores/local/intentionsStore
