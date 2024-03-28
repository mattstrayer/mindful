import { useDomains } from "@/stores/worker/domainsStore";

const store = useDomains();

function parseDomain(domain: string): string {
	const url = new URL(domain);
	return url.host;
}

function shouldBlockDomain(domain: string): boolean {
	const parsedDomain = parseDomain(domain);

	return store.blocklist.value.some((blockedDomain) => {
		return parsedDomain.includes(blockedDomain.domain);
	});
}

export default {
	shouldBlockDomain,
};
