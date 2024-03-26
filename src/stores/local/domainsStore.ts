import { createGlobalState } from "@vueuse/core";
import type { Domain } from "@/data/types";
import { generateUid } from "@/helpers";
import { BroadcastChannels, StoreUpdateMessage, Stores } from "@/messaging/types";
import { BroadcastChannel } from "broadcast-channel";
import { useDomainsState } from "../states";

import { defaultDomainList } from "@/data/defaults";


export const useDomains = createGlobalState(() => {

  const { blocklist, blockingEnabled } = useDomainsState();

  // Getters

  // watchers on state

  watch(blocklist, async (newBlocklist, oldBlocklist) => {
    publishChanges()
  })

  watch(blockingEnabled, async (newValue, oldValue) => {
    publishChanges()
  })


  function hydrateWithDefaultBlocklist() {
    defaultDomainList.forEach((domain) =>add(domain))

    publishChanges()
  }

  // Helpers

  async function publishChanges() {
    console.log('publishing to broadcast channel')

    const sourceTab = await browser.tabs.getCurrent();
    const sourceTabId = sourceTab?.id;

    await new BroadcastChannel<StoreUpdateMessage>(BroadcastChannels.publish).postMessage({
      store: Stores.Domains,
      data: { blocklist: toRaw(blocklist.value), blockingEnabled: toRaw(blockingEnabled.value) },
      sourceTabId
    });
  }

  // Actions

  async function add(url: string) {
    const domain = {} as Domain;
    domain.id = generateUid();
    domain.domain = url;

    blocklist.value.push(domain);
  }

  function remove(id: string) {
    const index = blocklist.value.findIndex((domain) => domain.id === id);
    if (index > -1) {
      blocklist.value.splice(index, 1);
    }
  }

  return {
    blocklist,
    blockingEnabled,
    add,
    remove,
    hydrateWithDefaultBlocklist
  };
});
