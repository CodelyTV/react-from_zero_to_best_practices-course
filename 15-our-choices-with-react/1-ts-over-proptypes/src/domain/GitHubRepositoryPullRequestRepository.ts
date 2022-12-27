import { RepositoryId } from "./GitHubRepository";
import { GitHubRepositoryPullRequest } from "./GitHubRepositoryPullRequest";

export interface GitHubRepositoryPullRequestRepository {
	search(repositoryId: RepositoryId): Promise<GitHubRepositoryPullRequest[]>;
}
