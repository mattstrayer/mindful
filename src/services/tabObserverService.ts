import type { Tabs } from "webextension-polyfill";

import { useDomains } from "@/stores/worker/domainsStore";
import DomainBlockingService from "./domainBlockingService";

const store = useDomains();

async function allTabs() {
	return browser.tabs.query({});
}

async function restoreTab(tabId: number, previousUrl: string) {
	const newUrl = atob(previousUrl.split("?url=")[1]);
	return redirectTab(tabId, newUrl);
}

function blockTab(tabId: number, previousUrl: string): Promise<Tabs.Tab> {
	let blockedUrl = `${browser.runtime.getURL("/newtab.html")}`;

	if (previousUrl) {
		const b64Url = btoa(previousUrl);
		blockedUrl = `${blockedUrl}?url=${b64Url}`;
	}

	return redirectTab(tabId, blockedUrl);
}
function redirectTab(tabId: number, url: string) {
	return browser.tabs.update(tabId, {
		url,
	});
}

function updateTabHandler(
	tabId: number,
	changeInfo: Tabs.OnUpdatedChangeInfoType,
	_tab: Tabs.Tab,
) {
	if (!store.blockingEnabled.value) return;
	if (changeInfo.url) {
		if (changeInfo.url.startsWith(browser.runtime.getURL(""))) return;

		if (changeInfo.url.startsWith("chrome://")) return;

		const shouldBlock = DomainBlockingService.shouldBlockDomain(changeInfo.url);
		console.log(`shouldBlock (${changeInfo.url}): ${shouldBlock}`);

		// need to save this enttity in the store
		// store id, blocked url (for categorizing?) , and base64 url
		if (shouldBlock) {
			blockTab(tabId, changeInfo.url);
		}
	}
}

//  to be called when the user enables blocking.
//  this will find all existing tabs that meet the blockable criteria
// and redirect them
async function findAndBlockTabs() {
	const tabs = await allTabs();

	return Promise.allSettled(
		tabs.map((tab) => {
			if (!tab.url) return;

			const shouldBlock = DomainBlockingService.shouldBlockDomain(tab?.url);

			if (shouldBlock && tab.id) {
				blockTab(tab.id, tab.url);
			}
		}),
	);
}

async function restoreAllTabs() {
	const tabs = await allTabs();

	return Promise.allSettled(
		tabs.map((tab) => {
			if (!tab.url) return;

			if (tab.id) {
				restoreTab(tab.id, tab.url);
			}
		}),
	);
}

export default {
	findAndBlockTabs,
	restoreAllTabs,
	updateTabHandler,
};
