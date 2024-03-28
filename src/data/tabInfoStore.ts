import type { Tabs } from "webextension-polyfill";

export const useTabInfoStore = async () => {
	const tab = ref(null as Tabs.Tab | null);
	try {
		tab.value = await browser.tabs.getCurrent();
	} catch (error) {
		console.log(`Error: ${error}`);
	}

	return { tab };
};
