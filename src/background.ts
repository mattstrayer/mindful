import boot from "./boot"
import DomainBlockingService from "./services/domainBlockingService"

boot()

export {}
// take cues from https://github.com/glkx/digital-detox/blob/master/src/javascript/background.js

// function test() {
//   console.log("test")
// }

// chrome.webNavigation.onTabReplaced.addListener(test);
// chrome.webNavigation.onCommitted.addListener(test);

// chrome.tabs.onCreated.addListener(test)
// chrome.tabs.onActivated.addListener(test)

// chrome.webRequest.onBeforeRequest.addListener(
//   function (details) {
//     console.log(details)
//   },
//   { urls: ["*://*/*"] },
//   ["blocking"]
// )

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // listen for events that change the tab's URL

  // or maybe...

  if (tab.url) {
    const shouldBlock = DomainBlockingService.shouldBlockDomain(tab.url)
      ? `should block ${tab.url}`
      : ""

    console.log(shouldBlock)
  }
  if (changeInfo.url) {
    if (changeInfo.url.includes(chrome.runtime.getURL("tabs/index.html")))
      return

    const shouldBlock = DomainBlockingService.shouldBlockDomain(changeInfo.url)
      ? `should block ${changeInfo.url}`
      : ""

    console.log(shouldBlock)

    const b64Url = btoa(changeInfo.url)
    console.log(b64Url)

    // need to save this enttity in the store
    // store id, blocked url (for categorizing?) , and base64 url
    // chrome.tabs.update(
    //   tabId,
    //   { url: `${chrome.runtime.getURL("tabs/index.html")}?url=${b64Url}` }
    // )
    // see if we need to block this.

    // if we do, redirect tab to tabs/index.html?url=b64(url)
  }
})

// chrome.webRequest.onBeforeRequest.addListener(function (details) {
//   console.log(details)
// },
//   {
//   urls: ['<all_urls>'],
//   types: ['main_frame'],
// })
