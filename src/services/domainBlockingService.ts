import { blockedDomains } from "../data/defaults"

export default class DomainBlockingService {
  static blockedDomains = blockedDomains // This will load from the DomainsRepository when it gets created

  static shouldBlockDomain(domain: string): boolean {
    const parsedDomain = this.parseDomain(domain)

    let res: boolean = false

    this.blockedDomains.forEach((blockedDomain) => {
      if (parsedDomain.includes(blockedDomain)) {
        res = true
      }
    })

    return res
  }

  private static parseDomain(domain: string): string {
    const url = new URL(domain)
    return url.host
  }
}
