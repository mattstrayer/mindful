import type { Task } from "@/data/types";
import { generateUid } from "@/helpers";
import { BroadcastChannels } from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";
import { differenceInDays, subDays } from "date-fns";
import { useTasksState } from "./states";

// All interactions with the settings will be done via actions, so that we can dispatch
// a broadcast-channel message to the worker

export const useTasks = () => {
	const { tasks, todaysTasks, yesterdaysIncompleteTasks } = useTasksState();

	async function add(name: string, completed = false) {
		const task = {} as Task;
		task.id = generateUid();
		task.name = name;
		task.completed = completed;
		task.createdAt = new Date();

		tasks[task.id] = task;
	}

	async function reset(task: Task) {
		task.completed = false;
		task.completedAt = undefined;
		task.createdAt = new Date();
		tasks[task.id] = task;
	}

	async function save(task: Task) {
		tasks[task.id] = task;
	}

	async function cleanupOldTasks() {
		const CUTOFF = 2; // days

		for (const task of Object.values(tasks)) {
			if (differenceInDays(new Date(), task.createdAt) > CUTOFF) {
				delete tasks[task.id];
			}
		}
	}

	return {
		tasks,
		todaysTasks,
		yesterdaysIncompleteTasks,
		add,
		reset,
		save,
		cleanupOldTasks,
	};
};
