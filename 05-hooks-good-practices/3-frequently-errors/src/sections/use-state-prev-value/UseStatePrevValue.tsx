/* eslint-disable no-console */
import { useState } from "react";
import { Link } from "react-router-dom";

export function UseStatePrevValue() {
	const [counter, setCounter] = useState(0);

	function incrementCounter() {
		// side effect like read from storage
		setTimeout(() => {
			console.log("response from side effect");
			setCounter(counter + 1);
		}, 1000);
	}

	return (
		<section>
			<h1>Modify useState prev value</h1>
			<button onClick={incrementCounter}>Increment counter: {counter}</button>
			<p>
				<Link to={"/use-state-prev-value-fixed"}>Fixed example</Link>
			</p>
		</section>
	);
}
