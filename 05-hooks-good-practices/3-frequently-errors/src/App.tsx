import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./sections/Home";
import { InfiniteLoop } from "./sections/infinite-loop/InfiniteLoop";
import { InfiniteLoopFixed } from "./sections/infinite-loop/InfiniteLoopFixed";
import { UseEffectWithoutReturn } from "./sections/use-effect-return/UseEffectWithoutReturn";
import { UseEffectWithReturn } from "./sections/use-effect-return/UseEffectWithReturn";
import { DerivatedStateWithoutUseMemo } from "./sections/use-memo/DerivatedStateWithoutUseMemo";
import { DerivatedStateWithUseMemo } from "./sections/use-memo/DerivatedStateWithUseMemo";
import { UseStatePrevValue } from "./sections/use-state-prev-value/UseStatePrevValue";
import { UseStatePrevValueFixed } from "./sections/use-state-prev-value/UseStatePrevValueFixed";

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
	{
		path: "/use-effect-return",
		element: <UseEffectWithoutReturn />,
	},
	{
		path: "/use-effect-return-fixed",
		element: <UseEffectWithReturn />,
	},
	{
		path: "/use-state-prev-value",
		element: <UseStatePrevValue />,
	},
	{
		path: "/use-state-prev-value-fixed",
		element: <UseStatePrevValueFixed />,
	},
]);

export function App() {
	return <RouterProvider router={router} />;
}
