import { config } from "../../devdash_config";
import { GitHubAccessTokenRepository } from "../../domain/GitHubAccessTokenRepository";

export class GitHubAccessTokenSearcher {
	constructor(private readonly repository: GitHubAccessTokenRepository) {}

	search(): string {
		const token = this.repository.search();

		return token || config.github_access_token;
	}
}
