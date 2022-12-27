import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { DashboardFactory } from "./sections/dashboard/DashboardFactory";
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
				path: "/repository/:organization/:name",
				element: GitHubRepositoryDetailFactory.create(),
			},
		],
	},
]);

export function Router() {
	return <RouterProvider router={router} />;
}
