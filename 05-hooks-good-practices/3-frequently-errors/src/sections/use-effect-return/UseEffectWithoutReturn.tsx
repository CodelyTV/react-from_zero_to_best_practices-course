import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* eslint-disable no-console */
export function UseEffectWithoutReturn() {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const resizeListener = (counter: number) => () => {
			// do cool things
			console.log(counter);
		};

		const listener = resizeListener(counter);

		window.addEventListener("resize", listener);
	}, [counter]);

	return (
		<section>
			<h1>useEffect without return</h1>
			<button
				onClick={() => {
					setCounter((prev) => prev + 1);
				}}
			>
				Add to counter: {counter}
			</button>
			<p>
				<Link to={"/use-effect-return-fixed"}>Fixed example</Link>
			</p>
		</section>
	);
}
