import React, { useEffect, useState } from "react";

export function ComponentWithHooks() {
	const [name, setName] = useState<string>("");
	const [surname, setSurname] = useState<string>("");

	function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
		setName(event.target.value);
	}

	function handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
		setSurname(event.target.value);
	}

	useEffect(() => {
		document.title = `${name} ${surname}`;
	}, [name, surname]);

	const [online, setOnline] = useState<boolean>(true);

	useEffect(() => {
		const handleOnline = () => setOnline(true);
		const handleOffline = () => setOnline(false);

		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);

		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);

	return (
		<>
			<p>Hello, what is your name?</p>
			<div>
				<label htmlFor="name">Name</label>
				<input id="name" value={name} onChange={handleNameChange} />
			</div>
			<div>
				<label htmlFor="surname">Surname</label>
				<input id="surname" value={surname} onChange={handleSurnameChange} />
			</div>
			<p>Your network connection is currently: {online ? "📶 online" : "🌋 offline"}</p>
		</>
	);
}
