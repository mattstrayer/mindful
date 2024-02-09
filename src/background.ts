import boot from "./boot"
import TabObserverService from "./services/tabObserverService"

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

chrome.tabs.onUpdated.addListener(TabObserverService.updateTabHandler)



// chrome.webRequest.onBeforeRequest.addListener(function (details) {
//   console.log(details)
// },
//   {
//   urls: ['<all_urls>'],
//   types: ['main_frame'],
// })
