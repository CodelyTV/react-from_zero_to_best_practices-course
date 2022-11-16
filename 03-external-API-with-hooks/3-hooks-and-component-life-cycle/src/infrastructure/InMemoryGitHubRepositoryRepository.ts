import { githubApiResponses } from "../github_api_responses";

export class InMemoryGitHubRepositoryRepository {
	search(): typeof githubApiResponses {
		return githubApiResponses;
	}
}
