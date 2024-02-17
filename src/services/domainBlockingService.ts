import { blockedDomains } from "../data/defaults"

export default class DomainBlockingService {
  static blockedDomains = blockedDomains // This will load from the DomainsRepository when it gets created

  static shouldBlockDomain(domain: string): boolean {
    const parsedDomain = this.parseDomain(domain)

    return this.blockedDomains.some((blockedDomain) => {
      return parsedDomain.includes(blockedDomain)
    })
  }

  private static parseDomain(domain: string): string {
    const url = new URL(domain)
    return url.host
  }
}
