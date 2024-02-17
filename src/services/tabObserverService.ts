import { useStore } from "~/store"

import DomainBlockingService from "./domainBlockingService"

const settingsStore = useStore()

export default class TabObserverService {
  static updateTabHandler(tabId, changeInfo, _tab) {
    if (!settingsStore.blockingEnabled) return
    // if (tab.url) {
    //   if (tab.url.includes(chrome.runtime.getURL(""))) return

    //   const shouldBlock = DomainBlockingService.shouldBlockDomain(tab.url)
    //     ? `should block ${tab.url}`
    //     : ""

    //   console.log(shouldBlock)
    // }
    if (changeInfo.url) {
      if (changeInfo.url.startsWith(chrome.runtime.getURL(""))) return

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
        chrome.tabs.update(tabId, {
          url: `${chrome.runtime.getURL("tabs/index.html")}?url=${b64Url}`
        })
      }
    }
  }
}
