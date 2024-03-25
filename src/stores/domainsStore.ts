import { defaultDomainList } from "@/data/defaults";
import type { Domain } from "@/data/types";
import { BroadcastChannel } from "broadcast-channel";

import { generateUid } from "@/helpers";

import { defineStore } from "pinia";
import { BroadcastChannels, MessageTypes } from "@/messaging/types";

export const useDomains = (shouldPersist = false) => {
  return defineStore("domains", async () => {
    // config options
    // do not export
    const persist = shouldPersist; // eslint-disable-line @typescript-eslint/no-unused-vars

    // state
    const blocklist = ref([] as Array<Domain>);
    const defaultDomains = ref(defaultDomainList);

    // actions
    async function add(url: string) {
      const domain = {} as Domain;
      domain.id = generateUid();
      domain.domain = url;

      blocklist.value.push(domain);
      // this.blocklist is deeply reactive
      // and is not able to be cloned

      await new BroadcastChannel<BlocklistUpdatedMessage>(BroadcastChannels.default).postMessage({
        type: MessageTypes.blocklistUpdated,
        data: blocklist.value,
      });
    }

    function remove(id: string) {
      const index = blocklist.value.findIndex((domain) => domain.id === id);
      if (index > -1) {
        blocklist.value.splice(index, 1);
      }
    }

    return {
      blocklist,
      defaultDomains,
      add,
      remove,
    };
  });
};
