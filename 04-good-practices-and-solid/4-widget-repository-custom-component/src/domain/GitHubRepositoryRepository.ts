import { GitHubRepository } from "./GitHubRepository";

export interface GitHubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GitHubRepository[]>;
}
