import TabObserverService from "../services/tabObserverService"

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });


  browser.tabs.onUpdated.addListener(TabObserverService.updateTabHandler)


});
