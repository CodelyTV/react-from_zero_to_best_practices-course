import { GitHubRepository, RepositoryId } from "./GitHubRepository";

export interface GitHubRepositoryRepository {
	search(repositoryUrls: string[]): Promise<GitHubRepository[]>;
	byId(repositoryId: RepositoryId): Promise<GitHubRepository | undefined>;
}
