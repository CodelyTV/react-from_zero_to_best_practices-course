/* eslint-disable no-console */
import { useState } from "react";

export function UseStatePrevValueFixed() {
	const [counter, setCounter] = useState(0);

	function incrementCounter() {
		// side effect like read from storage
		setTimeout(() => {
			console.log("response from side effect");
			setCounter((prevValue) => prevValue + 1);
		}, 1000);
	}

	return (
		<section>
			<h1>Modify useState prev value</h1>
			<button onClick={incrementCounter}>Increment counter: {counter}</button>
		</section>
	);
}
