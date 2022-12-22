import { useMemo } from "react";

import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./gitHubRepositoryWidget/GitHubRepositoryWidget";
import { useGitHubRepositories } from "./gitHubRepositoryWidget/useGitHubRepositories";
import { AddRepositoryWidgetForm } from "./repositoryWidget/AddRepositoryWidgetForm";
import { RepositoryWidgetsSkeleton } from "./repositoryWidget/RepositoryWidgetsSkeleton";

export function Dashboard({
	gitHubRepositoryRepository,
	repositoryWidgetRepository,
}: {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
}) {
	const gitHubRepositoryUrls = useMemo(() => {
		return config.widgets.map((widget) => widget.repository_url);
	}, []);

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
