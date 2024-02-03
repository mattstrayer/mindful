import { blockedDomains } from "../data/defaults"

export default class DomainBlockingService {
  public static blockedDomains = blockedDomains // This will load from the DomainsRepository when it gets created

  private static parseDomain(domain: string): string {
    const url = new URL(domain)
    return url.host
  }
  public static shouldBlockDomain(domain: string) {
    const parsedDomain = this.parseDomain(domain)

    let res = false

    this.blockedDomains.forEach((blockedDomain) => {
      if (parsedDomain.includes(blockedDomain)) {
        res = true
      }
    })

    return res
  }
}
