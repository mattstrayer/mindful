import type { Intention } from "@/data/types";
import { generateUid } from "@/helpers";
import { intentionsState as state } from "../states";

// All interactions with the settings will be done via actions, so that we can dispatch
// a broadcast-channel message to the worker

export const useIntentions = () => {
	function add(name: string) {
		const intention = {} as Intention;
		intention.id = generateUid();
		intention.name = name;

		state.intentions.push(intention);
	}

	function remove(id: string) {
		const index = state.intentions.findIndex(
			(intention) => intention.id === id,
		);
		if (index > -1) {
			state.intentions.splice(index, 1);
		}
		return {
			intentions: state.intentions,
		};
	}

	return {
		state,
		add,
		remove,
	};
};
