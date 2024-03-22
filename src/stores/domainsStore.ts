import type { Domain } from "@/data/types";

import { generateUid } from "@/helpers";

import { defineStore } from "pinia";

export const useDomains = defineStore("domains", {
  persist: true,
  state: () => {
    return {
      domains: [] as Array<Domain>,
    };
  },

  getters: {},
  actions: {
    add(url: string) {
      const domain = {} as Domain;
      domain.id = generateUid();
      domain.url = url;

      this.domains.push(domain);
    },

    remove(id: string) {
      const index = this.domains.findIndex((domain) => domain.id === id);
      if (index > -1) {
        this.domains.splice(index, 1);
      }
    },
  },
});
