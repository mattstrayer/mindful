
import { ref } from 'vue'
import type { Domain } from '@/data/types';

// watch works directly on a ref



// create a composable that gets called and deconstrcuted inside of this global state

export const useDomainsState = () => {
  // State
  const blocklist = ref([] as Array<Domain>);
  const blockingEnabled = ref(false);


  return {
    blocklist,
    blockingEnabled,
  };
};
