import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ConfigFactory } from "./sections/config/ConfigFactory";
import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
import { DashboardJs } from "./sections/dashboard/DashboardJs";
import { GitHubRepositoryDetailFactory } from "./sections/gitHubRepositoryDetail/GithubRepositoryDetailFactory";
import { Layout } from "./sections/layout/Layout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <DashboardFactory />,
			},
			{
				path: "/prop-types",
				element: <DashboardJs />,
			},
			{
				path: "/repository/:organization/:name",
				element: GitHubRepositoryDetailFactory.create(),
			},
			{
				path: "/config",
				element: <ConfigFactory />,
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
