import { Domain } from "@/data/types";

export interface DomainsStoreContract {
  blocklist: Array<Domain>;
  blockingEnabled: boolean;
}
