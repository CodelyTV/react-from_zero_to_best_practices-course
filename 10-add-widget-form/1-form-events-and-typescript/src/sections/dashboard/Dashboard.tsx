import { useMemo } from "react";

import { config } from "../../devdash_config";
import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { AddWidgetForm } from "./AddWidgetForm";
import styles from "./Dashboard.module.scss";
import { GitHubRepositoryWidget } from "./GitHubRepositoryWidget";
import { useGitHubRepositories } from "./useGitHubRepositories";
import { WidgetsSkeleton } from "./WidgetsSkeleton";

export function Dashboard({ repository }: { repository: GitHubRepositoryRepository }) {
	const gitHubRepositoryUrls = useMemo(() => {
		return config.widgets.map((widget) => widget.repository_url);
	}, []);

	const { repositoryData, isLoading } = useGitHubRepositories(repository, gitHubRepositoryUrls);

	return (
		<>
			<section className={styles.container}>
				{isLoading ? (
					<WidgetsSkeleton numberOfWidgets={gitHubRepositoryUrls.length} />
				) : (
					repositoryData.map((repository) => (
						<GitHubRepositoryWidget
							key={`${repository.id.organization}/${repository.id.name}`}
							repository={repository}
						/>
					))
				)}
				<AddWidgetForm />
			</section>

			{!isLoading && repositoryData.length === 0 && (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			)}
		</>
	);
}
