import { GitHubRepository } from "../domain/GitHubRepository";
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
				};
			})
		);
	}
}
