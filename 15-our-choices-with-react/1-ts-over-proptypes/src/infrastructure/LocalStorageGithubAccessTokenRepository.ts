import { GitHubAccessTokenRepository } from "../domain/GitHubAccessTokenRepository";

export class LocalStorageGitHubAccessTokenRepository implements GitHubAccessTokenRepository {
	localStorageKey = "github_access_token";

	search(): string {
		const token = localStorage.getItem(this.localStorageKey);

		return token ?? "";
	}

	save(token: string): void {
		localStorage.setItem(this.localStorageKey, token);
	}
}
