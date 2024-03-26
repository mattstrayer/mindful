import { useDomains } from "@/stores/worker/domainsStore";

export default class DomainBlockingService {
  static store = useDomains();

  static shouldBlockDomain(domain: string): boolean {
    const parsedDomain = this.parseDomain(domain);

    return this.store.blocklist.value.some((blockedDomain) => {
      return parsedDomain.includes(blockedDomain.domain);
    });
  }

  private static parseDomain(domain: string): string {
    const url = new URL(domain);
    return url.host;
  }
}
