import React from "react";

import { GitHubApiGitHubRepositoryPullRequestRepository } from "../../infrastructure/GitHubApiGitHubRepositoryPullRequestRepository";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { LocalStorageGitHubAccessTokenRepository } from "../../infrastructure/LocalStorageGithubAccessTokenRepository";
import { GitHubAccessTokenSearcher } from "../config/GithubAccessTokenSearcher";
import { GitHubRepositoryDetail } from "./GitHubRepositoryDetail";

const ghAccessTokenRepository = new LocalStorageGitHubAccessTokenRepository();
const ghAccessTokenSearcher = new GitHubAccessTokenSearcher(ghAccessTokenRepository);

const gitHubRepositoryRepository = new GitHubApiGitHubRepositoryRepository(
	ghAccessTokenSearcher.search()
);
const gitHubRepositoryPullRequestRepository = new GitHubApiGitHubRepositoryPullRequestRepository(
	ghAccessTokenSearcher.search()
);

export class GitHubRepositoryDetailFactory {
	static create(): React.ReactElement {
		return (
			<GitHubRepositoryDetail
				gitHubRepositoryRepository={gitHubRepositoryRepository}
				gitHubRepositoryPullRequestRepository={gitHubRepositoryPullRequestRepository}
			/>
		);
	}
}
