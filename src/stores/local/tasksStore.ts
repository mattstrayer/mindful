import type { Task } from "@/data/types";
import { generateUid } from "@/helpers";
import { BroadcastChannels } from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";
import { differenceInDays, subDays } from "date-fns";
import { tasksState as state } from "../states";

// All interactions with the settings will be done via actions, so that we can dispatch
// a broadcast-channel message to the worker

export const useTasks = () => {
	async function add(name: string, completed = false) {
		const task = {} as Task;
		task.id = generateUid();
		task.name = name;
		task.completed = completed;
		task.createdAt = new Date();

		state.tasks[task.id] = task;
	}

	async function reset(task: Task) {
		task.completed = false;
		task.completedAt = undefined;
		task.createdAt = new Date();

		state.tasks[task.id] = task;
	}

	async function save(task: Task) {
		state.tasks[task.id] = task;
	}

	async function cleanupOldTasks() {
		const CUTOFF = 2; // days

		for (const task of Object.values(state.tasks)) {
			if (differenceInDays(new Date(), task.createdAt) > CUTOFF) {
				delete state.tasks[task.id];
			}
		}
	}

	//  getters

	const todaysTasks = computed(() => {
		const today = new Date();

		return Object.values(state.tasks)
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

		return Object.values(state.tasks)
			.filter((task) => {
				const createdAt = new Date(task.createdAt);
				return differenceInDays(yesterday, createdAt) === 0;
			})
			.filter((task) => !task.completed);
	});

	return {
		state,
		todaysTasks,
		yesterdaysIncompleteTasks,
		add,
		reset,
		save,
		cleanupOldTasks,
	};
};
