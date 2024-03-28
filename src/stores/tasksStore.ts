import { useTabInfoStore } from "@/data/tabInfoStore";
import type { Task } from "@/data/types";
import { generateUid } from "@/helpers";
import {
	BroadcastChannels,
	MessageTypes,
	SavedTaskMessage,
} from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";
import { differenceInDays, subDays } from "date-fns";
import { defineStore } from "pinia";

// All interactions with the settings will be done via actions, so that we can dispatch
// a broadcast-channel message to the worker

export const useTasks = defineStore("tasks", {
	state: () => {
		return {
			tasks: {} as Record<string, Task>,
		};
	},

	getters: {
		todaysTasks: (state) => {
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
		},
		yesterdaysIncompleteTasks: (state) => {
			const yesterday = subDays(new Date(), 1);

			return Object.values(state.tasks)
				.filter((task) => {
					const createdAt = new Date(task.createdAt);
					return differenceInDays(yesterday, createdAt) === 0;
				})
				.filter((task) => !task.completed);
		},

		find: (state) => {
			return (id: string) => {
				return state.tasks[id];
			};
		},
	},
	actions: {
		async add(name: string, completed = false) {
			const tabInfo = await useTabInfoStore();

			const task = {} as Task;
			task.id = generateUid();
			task.name = name;
			task.completed = completed;
			task.createdAt = new Date();

			this.tasks[task.id] = task;

			// new BroadcastChannel<SavedTaskMessage>(BroadcastChannels.default).postMessage({
			//   tabId: tabInfo.tab?.id as number,
			//   type: MessageTypes.savedTask,
			//   data: task,
			// });
		},

		async reset(task: Task) {
			task.completed = false;
			task.completedAt = undefined;
			task.createdAt = new Date();
			this.tasks[task.id] = task;
		},

		async save(task: Task) {
			this.tasks[task.id] = task;
		},

		async cleanupOldTasks() {
			const CUTOFF = 2; // days

			for (const task of Object.values(this.tasks)) {
				if (differenceInDays(new Date(), task.createdAt) > CUTOFF) {
					delete this.tasks[task.id];
				}
			}
		},
	},
});
