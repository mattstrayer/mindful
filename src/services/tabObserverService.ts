// import { useStore } from "@/store"

import { useWorkerStore } from "@/workerStore"
import type { Tabs } from "webextension-polyfill"

import DomainBlockingService from "./domainBlockingService"

const workerStore = useWorkerStore()

export default class TabObserverService {
  static updateTabHandler(
    tabId: number,
    changeInfo: Tabs.OnUpdatedChangeInfoType,
    _tab: Tabs.Tab
  ) {
    if (!workerStore.blockingEnabled.value) return
    // if (tab.url) {
    //   if (tab.url.includes(chrome.runtime.getURL(""))) return

    //   const shouldBlock = DomainBlockingService.shouldBlockDomain(tab.url)
    //     ? `should block ${tab.url}`
    //     : ""

    //   console.log(shouldBlock)
    // }
    if (changeInfo.url) {
      if (changeInfo.url.startsWith(browser.runtime.getURL(""))) return

      if (changeInfo.url.startsWith("chrome://")) return

      const shouldBlock = DomainBlockingService.shouldBlockDomain(
        changeInfo.url
      )
        ? `should block ${changeInfo.url}`
        : ""

      console.log(shouldBlock)

      const b64Url = btoa(changeInfo.url)

      // need to save this enttity in the store
      // store id, blocked url (for categorizing?) , and base64 url
      if (shouldBlock) {
        browser.tabs.update(tabId, {
          url: `${browser.runtime.getURL("newtab.html")}?url=${b64Url}`
        })
      }
    }
  }
}
