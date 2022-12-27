import { useEffect, useState } from "react";

import { RepositoryId } from "../../domain/GitHubRepository";
import { GitHubRepositoryPullRequest } from "../../domain/GitHubRepositoryPullRequest";
import { GitHubRepositoryPullRequestRepository } from "../../domain/GitHubRepositoryPullRequestRepository";

export function useGitHubRepositoryPullRequests(
	repository: GitHubRepositoryPullRequestRepository,
	repositoryId: RepositoryId
): { isLoading: boolean; pullRequests: GitHubRepositoryPullRequest[] } {
	const [pullRequests, setPullRequests] = useState<GitHubRepositoryPullRequest[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		setIsLoading(true);
		repository.search(repositoryId).then((pullRequests) => {
			setPullRequests(pullRequests);
			setIsLoading(false);
		});
	}, [repository, repositoryId]);

	return {
		pullRequests,
		isLoading,
	};
}
