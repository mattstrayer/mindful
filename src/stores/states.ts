import type { Domain, Intention, Task } from "@/data/types";
import { differenceInDays, subDays } from "date-fns";
import { ref } from "vue";

// watch works directly on a ref

// create a composable that gets called and deconstrcuted inside of this global state

export const useDomainsState = () => {
	// State
	const blocklist = reactive([] as Array<Domain>);
	const blockingEnabled = ref(false);

	return {
		blocklist,
		blockingEnabled,
	};
};

export const intentionsState = {
	intentions: reactive([] as Array<Intention>),
};

export const tasksState = {
	tasks: reactive({} as Record<string, Task>),
};
