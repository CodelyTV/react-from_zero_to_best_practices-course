import { useEffect, useState } from "react";

/* eslint-disable no-console */
export function UseEffectWithReturn() {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const resizeListener = (counter: number) => () => {
			// do cool things
			console.log(counter);
		};

		const listener = resizeListener(counter);

		window.addEventListener("resize", listener);

		return () => {
			window.removeEventListener("resize", listener);
		};
	}, [counter]);

	return (
		<section>
			<h1>useEffect with return callback</h1>
			<button
				onClick={() => {
					setCounter((prev) => prev + 1);
				}}
			>
				Add to counter: {counter}
			</button>
		</section>
	);
}
