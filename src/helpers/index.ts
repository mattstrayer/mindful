export const extensionId = () => {
  // chrome for Chrome, browser for Firefox
  return chrome.runtime.id || browser.runtime.id
}
