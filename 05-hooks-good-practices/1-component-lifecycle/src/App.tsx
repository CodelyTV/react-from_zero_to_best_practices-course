import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ClassComponent } from "./sections/ClassComponent";
import { ComponentWithHooks } from "./sections/ComponentWithHooks";
import { Home } from "./sections/Home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/class",
		element: <ClassComponent />,
	},
	{
		path: "/hooks",
		element: <ComponentWithHooks />,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
