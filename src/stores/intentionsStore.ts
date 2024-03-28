import type { Intention } from "@/data/types";
import { generateUid } from "@/helpers";
import { useIntentionsState } from "./states";

// All interactions with the settings will be done via actions, so that we can dispatch
// a broadcast-channel message to the worker

export const useIntentions = () => {
	const { intentions } = useIntentionsState();

	function add(name: string) {
		const intention = {} as Intention;
		intention.id = generateUid();
		intention.name = name;

		intentions.value.push(intention);
	}

	function remove(id: string) {
		const index = intentions.value.findIndex(
			(intention) => intention.id === id,
		);
		if (index > -1) {
			intentions.value.splice(index, 1);
		}

		return { intentions };
	}
};
