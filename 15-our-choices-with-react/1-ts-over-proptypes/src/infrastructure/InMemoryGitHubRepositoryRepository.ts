import { GitHubRepository, RepositoryId } from "../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../domain/GitHubRepositoryRepository";
import { githubApiResponses } from "../github_api_responses";

export class InMemoryGitHubRepositoryRepository implements GitHubRepositoryRepository {
	async search(): Promise<GitHubRepository[]> {
		return Promise.resolve(
			githubApiResponses.map(({ repositoryData, pullRequests, ciStatus }) => {
				return {
					id: {
						name: repositoryData.name,
						organization: repositoryData.organization.login,
					},
					url: repositoryData.url,
					description: repositoryData.description,
					private: repositoryData.private,
					updatedAt: new Date(repositoryData.updated_at),
					hasWorkflows: ciStatus.workflow_runs.length > 0,
					isLastWorkflowSuccess:
						ciStatus.workflow_runs.length > 0 &&
						ciStatus.workflow_runs[0].status === "completed" &&
						ciStatus.workflow_runs[0].conclusion === "sucess",
					stars: repositoryData.stargazers_count,
					watchers: repositoryData.watchers_count,
					forks: repositoryData.forks_count,
					issues: repositoryData.open_issues_count,
					pullRequests: pullRequests.length,
					workflowRunsStatus: ciStatus.workflow_runs.map((run) => ({
						id: run.id,
						name: run.name,
						title: run.display_title,
						url: run.html_url,
						createdAt: new Date(run.created_at),
						status: run.status,
						conclusion: run.conclusion,
					})),
				};
			})
		);
	}

	async byId(repositoryId: RepositoryId): Promise<GitHubRepository | undefined> {
		const repositories = await this.search();

		return repositories.find(
			(repositories) =>
				repositories.id.name === repositoryId.name &&
				repositories.id.organization &&
				repositoryId.organization
		);
	}
}
