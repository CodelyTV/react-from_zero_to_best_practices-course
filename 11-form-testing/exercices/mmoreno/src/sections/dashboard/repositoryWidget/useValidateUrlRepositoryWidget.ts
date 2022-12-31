const ensureIsGitHubRepositoryDomain = (url: URL): boolean => {
	return url.hostname === "github.com";
};
const ensureIsValidUrl = (url: string): boolean => {
	try {
		const urlRepository = new URL(url);

		return ensureIsGitHubRepositoryDomain(urlRepository);
	} catch (error) {
		return false;
	}
};
export function useValidateUrlRepositoryWidget(): { ensureIsValidUrl: (url: string) => boolean } {
	return {
		ensureIsValidUrl,
	};
}
