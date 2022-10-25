import React from "react";

import { config } from "../../devdash_config";

export function Dashboard() {
	const title = "DevDash_";

	return (
		<>
			<head>
				<h1>{title}</h1>
			</head>
			<section>
				<ul>
					{config.widgets.map((widget) => (
						<li key={widget.id}>{widget.repository_url}</li>
					))}
				</ul>
			</section>
		</>
	);
}
