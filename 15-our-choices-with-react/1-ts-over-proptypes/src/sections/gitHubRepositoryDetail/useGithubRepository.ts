import { useEffect, useState } from "react";

import { GitHubRepository, RepositoryId } from "../../domain/GitHubRepository";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";

export function useGitHubRepository(
	repository: GitHubRepositoryRepository,
	repositoryId: RepositoryId
): {
	repositoryData: GitHubRepository | undefined;
} {
	const [repositoryData, setRepositoryData] = useState<GitHubRepository>();

	useEffect(() => {
		repository.byId(repositoryId).then((repositoryData) => {
			setRepositoryData(repositoryData);
		});
	}, [repository, repositoryId]);

	return { repositoryData };
}
