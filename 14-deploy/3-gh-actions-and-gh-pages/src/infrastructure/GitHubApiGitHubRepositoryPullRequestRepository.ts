import { RepositoryId } from "../domain/GitHubRepository";
import { GitHubRepositoryPullRequest } from "../domain/GitHubRepositoryPullRequest";
import { GitHubRepositoryPullRequestRepository } from "../domain/GitHubRepositoryPullRequestRepository";
import { PullRequest } from "./GitHubApiResponse";

export class GitHubApiGitHubRepositoryPullRequestRepository
	implements GitHubRepositoryPullRequestRepository
{
	private readonly endpoints = "https://api.github.com/repos/$organization/$name/pulls";

	constructor(private readonly personalAccessToken: string) {}

	async search(repositoryId: RepositoryId): Promise<GitHubRepositoryPullRequest[]> {
		const url = this.endpoints
			.replace("$organization", repositoryId.organization)
			.replace("$name", repositoryId.name);

		return fetch(url, { headers: { Authorization: `Bearer ${this.personalAccessToken}` } })
			.then<PullRequest[]>((response) => response.json())
			.then((response) => {
				return response.map((pr) => ({
					id: pr.id,
					title: pr.title,
					url: pr.html_url,
					createdAt: new Date(pr.created_at),
				}));
			});
	}
}
