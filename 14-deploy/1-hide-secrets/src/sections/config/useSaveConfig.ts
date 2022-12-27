import { GitHubAccessTokenRepository } from "../../domain/GitHubAccessTokenRepository";

export function useSaveConfig(repository: GitHubAccessTokenRepository): {
	save: (token: string) => void;
} {
	function save(token: string): void {
		repository.save(token);
	}

	return { save };
}
