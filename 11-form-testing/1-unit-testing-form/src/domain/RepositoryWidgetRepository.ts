import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	save(widget: RepositoryWidget): Promise<void>;
}
