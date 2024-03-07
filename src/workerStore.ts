import { createGlobalState } from "@vueuse/core"
import { ref } from "vue"

export const useWorkerStore = createGlobalState(() => {
  const blockingEnabled = ref(false)

  return { blockingEnabled }
})
