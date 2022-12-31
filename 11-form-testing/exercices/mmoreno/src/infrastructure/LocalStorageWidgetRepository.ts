import { RepositoryWidget } from "../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../domain/RepositoryWidgetRepository";

export class LocalStorageRepositoryWidgetRepository implements RepositoryWidgetRepository {
	async search(): Promise<RepositoryWidget[]> {
		return Promise.resolve([]);
	}

	// eslint-disable-next-line unused-imports/no-unused-vars
	async save(widget: RepositoryWidget): Promise<void> {
		await Promise.resolve();
	}
}
