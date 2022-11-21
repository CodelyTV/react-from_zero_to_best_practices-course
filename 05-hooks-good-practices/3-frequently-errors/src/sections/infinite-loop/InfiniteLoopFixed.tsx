/* eslint-disable no-console */
import { useEffect, useState } from "react";

export function InfiniteLoopFixed() {
	const [data, setData] = useState(0);

	useEffect(() => {
		console.log("useEffect");

		// Simulate side effect like external API call
		setTimeout(() => {
			setData(Math.random());
		}, 1000);
	}, []);

	return (
		<section>
			<h1>Infinite loop in useEffect fixed</h1>
			<span>Remote data: {data}</span>
		</section>
	);
}
