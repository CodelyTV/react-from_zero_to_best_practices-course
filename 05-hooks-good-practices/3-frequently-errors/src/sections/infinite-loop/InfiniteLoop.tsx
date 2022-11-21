/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function InfiniteLoop() {
	const [data, setData] = useState(0);

	useEffect(() => {
		console.log("useEffect");

		// Simulate side effect like external API call
		setTimeout(() => {
			setData(Math.random());
		}, 1000);
	});

	return (
		<section>
			<h1>Infinite loop in useEffect</h1>
			<p>Remote data: {data}</p>
			<p>
				<Link to={"/infinite-loop-fixed"}>Fixed example</Link>
			</p>
		</section>
	);
}
