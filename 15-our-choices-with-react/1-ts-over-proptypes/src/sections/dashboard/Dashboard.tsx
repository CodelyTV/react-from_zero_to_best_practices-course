/* eslint-disable no-empty-pattern */

import { GitHubRepositoryRepository } from "../../domain/GitHubRepositoryRepository";
import { RepositoryWidget } from "../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../domain/RepositoryWidgetRepository";
import styles from "./Dashboard.module.scss";
import { SaluteWithTs } from "./SaluteWithTs";

export function Dashboard({}: {
	gitHubRepositoryRepository: GitHubRepositoryRepository;
	repositoryWidgetRepository: RepositoryWidgetRepository;
	repositoryWidgets: RepositoryWidget[];
}) {
	return (
		<>
			<section className={styles.container}>
				<SaluteWithTs age={31} name={"Ismael"} />
			</section>
		</>
	);
}
