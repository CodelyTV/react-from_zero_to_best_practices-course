import React, { createContext, useContext, useEffect, useState } from "react";

import { config } from "../../../devdash_config";
import { DomainEvents } from "../../../domain/DomainEvents";
import { RepositoryWidget } from "../../../domain/RepositoryWidget";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidgetRepository";

const RepositoryWidgetContext = createContext<{ repositoryWidgets: RepositoryWidget[] }>({
	repositoryWidgets: [],
});

export function RepositoryWidgetContextProvider({
	children,
	repository,
}: {
	children: React.ReactElement;
	repository: RepositoryWidgetRepository;
}) {
	const [repositoryWidgets, setRepositoryWidgets] = useState<RepositoryWidget[]>([]);

	useEffect(() => {
		repository.search().then((repositoryWidgets) => {
			if (repositoryWidgets.length === 0) {
				setRepositoryWidgets(
					config.widgets.map((w) => ({ id: w.id, repositoryUrl: w.repository_url }))
				);

				return;
			}

			setRepositoryWidgets(repositoryWidgets);
		});
	}, [repository]);

	useEffect(() => {
		const reloadRepositoryWidgets = () => {
			repository.search().then(setRepositoryWidgets);
		};

		document.addEventListener(DomainEvents.repositoryWidgetAdded, reloadRepositoryWidgets);

		return () => {
			document.removeEventListener(DomainEvents.repositoryWidgetAdded, reloadRepositoryWidgets);
		};
	}, [repository]);

	return (
		<RepositoryWidgetContext.Provider value={{ repositoryWidgets }}>
			{children}
		</RepositoryWidgetContext.Provider>
	);
}

export const useRepositoryWidgetContext = () => useContext(RepositoryWidgetContext);
