import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./sections/Home";
import { InfiniteLoop } from "./sections/infinite-loop/InfiniteLoop";
import { InfiniteLoopFixed } from "./sections/infinite-loop/InfiniteLoopFixed";
import { DerivatedStateWithoutUseMemo } from "./sections/use-memo/DerivatedStateWithoutUseMemo";
import { DerivatedStateWithUseMemo } from "./sections/use-memo/DerivatedStateWithUseMemo";

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
	{
		path: "/no-use-memo",
		element: <DerivatedStateWithoutUseMemo />,
	},
	{
		path: "/use-memo",
		element: <DerivatedStateWithUseMemo />,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
