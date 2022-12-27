import { RepositoryId } from "../../domain/GitHubRepository";
import { GitHubRepositoryPullRequestRepository } from "../../domain/GitHubRepositoryPullRequestRepository";
import { Loader } from "../layout/Loader";
import styles from "./GitHubRepositoryDetail.module.scss";
import { useGitHubRepositoryPullRequests } from "./useGitHubRepositoryPullRequests";

export function PullRequests({
	repository,
	repositoryId,
}: {
	repositoryId: RepositoryId;
	repository: GitHubRepositoryPullRequestRepository;
}) {
	const { isLoading, pullRequests } = useGitHubRepositoryPullRequests(repository, repositoryId);

	return (
		<>
			<h3>Pull requests</h3>
			<table className={styles.detail__table}>
				<thead>
					<tr>
						<th>Título</th>
						<th>Fecha</th>
					</tr>
				</thead>
				<tbody>
					{!isLoading &&
						pullRequests.map((pullRequest) => (
							<tr key={pullRequest.id}>
								<td>
									<a target="_blank" href={pullRequest.url} rel="noreferrer">
										{pullRequest.title}
									</a>
								</td>
								<td>{pullRequest.createdAt.toLocaleDateString("es-ES")}</td>
							</tr>
						))}
				</tbody>
			</table>
			{isLoading && <Loader />}
		</>
	);
}
