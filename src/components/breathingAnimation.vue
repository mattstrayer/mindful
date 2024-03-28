<script setup lang="ts">
import { useMotion } from "@vueuse/motion";
import { ref } from "vue";

const target = ref<HTMLElement>();

const emit = defineEmits(["completed-iteration"]);

const motionInstance = useMotion(target, {
	initial: {
		opacity: 0,
	},

	enter: {
		opacity: 1,
		transition: {
			duration: 4000,
			type: "easeIn",
			onComplete() {
				motionInstance.variant.value = "out";
			},
		},
	},
	out: {
		opacity: 0,
		transition: {
			delay: 7000,
			duration: 8000,
			type: "easeOut",
			onComplete() {
				emit("completed-iteration");
				motionInstance.variant.value = "enter";
			},
		},
	},
});
</script>

<template>
  <div ref="target"><slot /></div>
</template>
