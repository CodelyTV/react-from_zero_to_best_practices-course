import { RepositoryAlreadyExistsError } from "./RepositoryAlreadyExistsError";
import { RepositoryWidget } from "./RepositoryWidget";

export interface RepositoryWidgetRepository {
	search(): Promise<RepositoryWidget[]>;
	save(widget: RepositoryWidget): Promise<RepositoryAlreadyExistsError | void>;
}
