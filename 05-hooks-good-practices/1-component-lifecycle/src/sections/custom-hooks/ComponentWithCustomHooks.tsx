import React from "react";

import { useDocumentTitle } from "./useDocumentTitle";
import { useFormInput } from "./useFormInput";
import { useOnlineStatus } from "./useOnlineStatus";

export function ComponentWithCustomHooks() {
	const name = useFormInput("");
	const surname = useFormInput("");
	const { online } = useOnlineStatus();
	useDocumentTitle(`${name.value} ${surname.value}`);

	return (
		<>
			<p>Hello, what is your name?</p>
			<div>
				<label htmlFor="name">Name</label>
				<input id="name" {...name} />
			</div>
			<div>
				<label htmlFor="surname">Surname</label>
				<input id="surname" {...surname} />
			</div>
			<p>Your network connection is currently: {online ? "📶 online" : "🌋 offline"}</p>
		</>
	);
}
