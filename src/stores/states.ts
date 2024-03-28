import type { Domain, Intention, Task } from "@/data/types";
import { differenceInDays, subDays } from "date-fns";
import { ref } from "vue";

// watch works directly on a ref

// create a composable that gets called and deconstrcuted inside of this global state

export const useDomainsState = () => {
	// State
	const blocklist = ref([] as Array<Domain>);
	const blockingEnabled = ref(false);

	return {
		blocklist,
		blockingEnabled,
	};
};

export const useIntentionsState = () => {
	const intentions = ref([] as Array<Intention>);

	return {
		intentions,
	};
};

export const useTasksState = () => {
	const tasks = ref({} as Record<string, Task>);

	const todaysTasks = computed(() => {
		const today = new Date();

		return Object.values(tasks)
			.filter((task) => {
				const createdAt = new Date(task.createdAt);

				return differenceInDays(today, createdAt) === 0;
			})
			.sort((a: Task, b: Task) => {
				if (a.completed && b.completed) {
					return 0;
				}
				if (a.completed) {
					return 1;
				}
				if (b.completed) {
					return -1;
				}
				return 0;
			});
	});

	const yesterdaysIncompleteTasks = computed(() => {
		const yesterday = subDays(new Date(), 1);

		return Object.values(tasks)
			.filter((task) => {
				const createdAt = new Date(task.createdAt);
				return differenceInDays(yesterday, createdAt) === 0;
			})
			.filter((task) => !task.completed);
	});

	return {
		tasks,
		todaysTasks,
		yesterdaysIncompleteTasks,
	};
};
