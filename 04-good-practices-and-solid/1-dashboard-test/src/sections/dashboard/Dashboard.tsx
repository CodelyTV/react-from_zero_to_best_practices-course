import { useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infrastructure/GitHubApiGitHubRepositoryRepository";
import { GitHubApiResponses } from "../../infrastructure/GitHubApiResponse";
import { ReactComponent as Brand } from "./brand.svg";
import { ReactComponent as Check } from "./check.svg";
import styles from "./Dashboard.module.scss";
import { ReactComponent as Error } from "./error.svg";
import { ReactComponent as PullRequests } from "./git-pull-request.svg";
import { ReactComponent as IssueOpened } from "./issue-opened.svg";
import { ReactComponent as Lock } from "./lock.svg";
import { ReactComponent as Forks } from "./repo-forked.svg";
import { ReactComponent as Start } from "./star.svg";
import { ReactComponent as Unlock } from "./unlock.svg";
import { ReactComponent as Watchers } from "./watchers.svg";

const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};

export function Dashboard() {
	const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);
	const [repositoryData, setRepositoryData] = useState<GitHubApiResponses[]>([]);

	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((repositoryData) => {
				setRepositoryData(repositoryData);
			});
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>DevDash_</h1>
				</section>
			</header>
			{repositoryData.length === 0 ? (
				<div className={styles.empty}>
					<span>No hay widgets configurados.</span>
				</div>
			) : (
				<section className={styles.container}>
					{repositoryData.map((widget) => (
						<article className={styles.widget} key={widget.repositoryData.id}>
							<header className={styles.widget__header}>
								<h2 className={styles.widget__title}>
									<a
										href={widget.repositoryData.html_url}
										target="_blank"
										title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
										rel="noreferrer"
									>
										{widget.repositoryData.organization.login}/{widget.repositoryData.name}
									</a>
								</h2>
								{widget.repositoryData.private ? <Lock /> : <Unlock />}
							</header>
							<div className={styles.widget__body}>
								<div className={styles.widget__status}>
									<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
									{widget.ciStatus.workflow_runs.length > 0 && (
										<div>
											{widget.ciStatus.workflow_runs[0].status === "completed" ? (
												<Check />
											) : (
												<Error />
											)}
										</div>
									)}
								</div>
								<p className={styles.widget__description}>{widget.repositoryData.description}</p>
							</div>
							<footer className={styles.widget__footer}>
								<div className={styles.widget__stat}>
									<Start />
									<span>{widget.repositoryData.stargazers_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<Watchers />
									<span>{widget.repositoryData.watchers_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<Forks />
									<span>{widget.repositoryData.forks_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<IssueOpened />
									<span>{widget.repositoryData.open_issues_count}</span>
								</div>
								<div className={styles.widget__stat}>
									<PullRequests />
									<span>{widget.pullRequests.length}</span>
								</div>
							</footer>
						</article>
					))}
				</section>
			)}
		</>
	);
}
