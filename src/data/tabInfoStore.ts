import { createGlobalState } from "@vueuse/core";

export const useTabInfoStore = createGlobalState(async () => {
  let tab = null;
  try {
    tab = await browser.tabs.getCurrent();
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  return { tab };
});
