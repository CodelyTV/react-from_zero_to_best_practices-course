import { useMemo } from "react";

import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidget } from "../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./gitHubRepositoryWidget/GitHubRepositoryWidget";
import { useGitHubRepositories } from "./gitHubRepositoryWidget/useGitHubRepositories";
import { AddRepositoryWidgetForm } from "./repositoryWidget/AddRepositoryWidgetForm";
import { RepositoryWidgetsSkeleton } from "./repositoryWidget/RepositoryWidgetsSkeleton";

export function Dashboard({
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
	repositoryWidgets,
}: {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
	repositoryWidgets: RepositoryWidget[];
}) {
	const gitHubRepositoryUrls = useMemo(() => {
		return repositoryWidgets.map((widget) => widget.repositoryUrl);
	}, [repositoryWidgets]);

	const { gitHubRepositories, isLoading } = useGitHubRepositories(
		gitHubRepositoryRepository,
		gitHubRepositoryUrls
	);

	return (
		<>
			<section className={styles.container}>
				{isLoading ? (
					<RepositoryWidgetsSkeleton numberOfWidgets={gitHubRepositoryUrls.length} />
				) : (
					gitHubRepositories.map((repository) => (
						<GitHubRepositoryWidget
							key={`${repository.id.organization}/${repository.id.name}`}
							repository={repository}
						/>
					))
				)}
				<AddRepositoryWidgetForm repository={repositoryWidgetRepository} />
			</section>

			{!isLoading && gitHubRepositories.length === 0 && (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			)}
		</>
	);
}
