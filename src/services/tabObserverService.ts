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

    if (changeInfo.url) {
      if (changeInfo.url.startsWith(browser.runtime.getURL(""))) return

      if (changeInfo.url.startsWith("chrome://")) return

      const shouldBlock = DomainBlockingService.shouldBlockDomain(
        changeInfo.url
      )

      // need to save this enttity in the store
      // store id, blocked url (for categorizing?) , and base64 url
      if (shouldBlock) {
        this.blockTab(tabId, changeInfo.url)
      }
    }
  }

  //  to be called when the user enables blocking.
  //  this will find all existing tabs that meet the blockable criteria
  // and redirect them
  static findAndBlockTabs() {
    // query for all tabs
    // for each
    // DomainBlockingService.shouldBlockDomain(tab.url)
    // if true,
    // blockTab(tab.id, tab.url)
  }

  static restoreAllTabs() {
    // query for all tabs
    // for each
    // see which tabs match the browser.runtime.getURL("newtab.html") pattern
    // for those tabs -> restoreTab(tab.id)
  }

  private static async restoreTab(tabId: number) {
    // get tab info from tab id
    const tab = await browser.tabs.get(tabId)

    const newUrl = atob(tab!.url!.split("?url=")[1])

    browser.tabs.update(tabId, {
      url: newUrl
    })
  }

  private static blockTab(tabId: number, previousUrl: string) {
    let blockedUrl = `${browser.runtime.getURL("newtab.html")}`

    if (previousUrl) {
      const b64Url = btoa(previousUrl)
      blockedUrl = `${blockedUrl}?url=${b64Url}`
    }

    browser.tabs.update(tabId, {
      url: blockedUrl
    })
  }
}
