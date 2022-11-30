export interface RepositoryId {
	organization: string;
	name: string;
}

export interface GitHubRepository {
	id: RepositoryId;
	url: string;
	description: string;
	private: boolean;
	updatedAt: Date;
	hasWorkflows: boolean;
	isLastWorkflowSuccess: boolean;
	stars: number;
	watchers: number;
	forks: number;
	issues: number;
	pullRequests: number;
}
