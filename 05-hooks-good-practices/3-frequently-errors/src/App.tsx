import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./sections/Home";
import { InfiniteLoop } from "./sections/infinite-loop/InfiniteLoop";
import { InfiniteLoopFixed } from "./sections/infinite-loop/InfiniteLoopFixed";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/infinite-loop",
		element: <InfiniteLoop />,
	},
	{
		path: "/infinite-loop-fixed",
		element: <InfiniteLoopFixed />,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
