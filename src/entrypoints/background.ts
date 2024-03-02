import TabObserverService from "../services/tabObserverService"


export {}
// take cues from https://github.com/glkx/digital-detox/blob/master/src/javascript/background.js

// function test() {
//   console.log("test")
// }

// chrome.webNavigation.onTabReplaced.addListener(test);
// chrome.webNavigation.onCommitted.addListener(test);

// chrome.tabs.onCreated.addListener(test)
// chrome.tabs.onActivated.addListener(test)



export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });


  browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler)


});
