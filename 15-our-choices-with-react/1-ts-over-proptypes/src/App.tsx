import "react-loading-skeleton/dist/skeleton.css";

import { LocalStorageRepositoryWidgetRepository } from "./infrastructure/LocalStorageWidgetRepository";
import { Router } from "./Router";
import { RepositoryWidgetContextProvider } from "./sections/dashboard/repositoryWidget/RepositoryWidgetContextProvider";

const repository = new LocalStorageRepositoryWidgetRepository();

export function App() {
	return (
		<RepositoryWidgetContextProvider repository={repository}>
			<Router />
		</RepositoryWidgetContextProvider>
	);
}
