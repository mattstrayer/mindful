// import { useStore } from "@/store"

import { useDomains } from "@/stores/worker/domainsStore";
import type { Tabs } from "webextension-polyfill";

import DomainBlockingService from "./domainBlockingService";

const store = useDomains();

export default class TabObserverService {
  static updateTabHandler(tabId: number, changeInfo: Tabs.OnUpdatedChangeInfoType, _tab: Tabs.Tab) {
    if (!store.blockingEnabled.value) return;

    if (changeInfo.url) {
      if (changeInfo.url.startsWith(browser.runtime.getURL(""))) return;

      if (changeInfo.url.startsWith("chrome://")) return;

      const shouldBlock = DomainBlockingService.shouldBlockDomain(changeInfo.url);
      console.log(shouldBlock + `${changeInfo.url}`);

      // need to save this enttity in the store
      // store id, blocked url (for categorizing?) , and base64 url
      if (shouldBlock) {
        this.blockTab(tabId, changeInfo.url);
      }
    }
  }

  //  to be called when the user enables blocking.
  //  this will find all existing tabs that meet the blockable criteria
  // and redirect them
  static async findAndBlockTabs() {
    const tabs = await this.allTabs();

    return Promise.allSettled(
      tabs.map((tab) => {
        if (!tab.url) return;

        const shouldBlock = DomainBlockingService.shouldBlockDomain(tab?.url);

        if (shouldBlock && tab.id) {
          this.blockTab(tab.id, tab.url);
        }
      }),
    );
  }

  static async restoreAllTabs() {
    const tabs = await this.allTabs();

    return Promise.allSettled(
      tabs.map((tab) => {
        if (!tab.url) return;

        if (tab.id) {
          this.restoreTab(tab.id, tab.url);
        }
      }),
    );
  }

  private static async allTabs() {
    return browser.tabs.query({});
  }

  private static async restoreTab(tabId: number, previousUrl: string) {
    const newUrl = atob(previousUrl.split("?url=")[1]);

    return this.redirectTab(tabId, newUrl);
  }

  private static blockTab(tabId: number, previousUrl: string): Promise<Tabs.Tab> {
    let blockedUrl = `${browser.runtime.getURL("newtab.html")}`;

    if (previousUrl) {
      const b64Url = btoa(previousUrl);
      blockedUrl = `${blockedUrl}?url=${b64Url}`;
    }

    return this.redirectTab(tabId, blockedUrl);
  }
  private static redirectTab(tabId: number, url: string) {
    return browser.tabs.update(tabId, {
      url,
    });
  }
}
