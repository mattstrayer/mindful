import { createGlobalState } from "@vueuse/core";
import type { Domain } from "@/data/types";
import { generateUid } from "./helpers";
import { BroadcastChannels, DomainsUpdatedMessage, Stores } from "./messaging/types";
import { BroadcastChannel } from "broadcast-channel";

import { defaultDomainList } from "@/data/defaults";

// create a composable that gets called and deconstrcuted inside of this global state

const useDomainsState = () => {
  // State
  const blocklist = ref([] as Array<Domain>);
  const blockingEnabled = ref(false);
  const defaultDomains = ref(defaultDomainList);

  // Getters

  return {
    blocklist,
    blockingEnabled,
    defaultDomains,
  };
};

export const useDomains = createGlobalState(() => {
  const storageKey = "domains";

  const { defaultDomains, blocklist, blockingEnabled } = useDomainsState();

  // Helpers

  function persist() {
    browser.storage.local.set({
      [storageKey]: {
        blockingEnabled: blockingEnabled.value,
        blocklist: blocklist.value,
      },
    });
  }

  async function persistAndNotify() {
    await persist();

    await new BroadcastChannel<DomainsUpdatedMessage>(BroadcastChannels.default).postMessage({
      store: Stores.Domains,
      data: { blocklist: toRaw(blocklist.value), blockingEnabled: toRaw(blockingEnabled.value) },
    });
  }

  // Actions

  async function add(url: string) {
    const domain = {} as Domain;
    domain.id = generateUid();
    domain.domain = url;

    blocklist.value.push(domain);
    persistAndNotify();
  }

  function remove(id: string) {
    const index = blocklist.value.findIndex((domain) => domain.id === id);
    if (index > -1) {
      blocklist.value.splice(index, 1);
    }
    persistAndNotify();
  }

  return {
    defaultDomains,
    blocklist,
    blockingEnabled,
    add,
    remove,
  };
});
