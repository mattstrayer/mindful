<script setup lang="ts">
  import { useDomains } from "@/stores/domainsStore";

  import AddIntention from "./addIntention.vue";
  import IntentionListItem from "./intentionListItem.vue";

  const store = useDomains();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="collapse bg-base-200 border-base-300 border collapse-arrow">
      <input type="checkbox" checked />
      <div class="collapse-title text-2xl font-medium text-zinc-100 text-center">blocked sites</div>
      <div class="collapse-content">
        <div v-for="(domain, index) in store.blocklist" :key="index">
          {{ domain.domain }}
        </div>
        <!-- <AddIntention class="mb-4" />
        <IntentionListItem
          v-for="(domain, index) in domainsStore.domains"
          :key="index"
          :intention="domain"
        /> -->
      </div>
    </div>
  </div>
</template>
