import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Book {
	name: string;
}

export function DerivatedStateWithoutUseMemo() {
	const [books, setBooks] = useState<Book[]>([]);
	const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		//Simulate external api call
		setTimeout(() => {
			setBooks([{ name: "Aprendiendo Git" }, { name: "DDD en TypeScript" }]);
		}, 1500);
	}, []);

	useEffect(() => {
		setFilteredBooks(
			books.filter((book) => book.name.toUpperCase().includes(filter.toUpperCase()))
		);
	}, [books, filter]);

	return (
		<section>
			<h1>Derivated state without useMemo</h1>
			<input
				value={filter}
				onChange={(ev: ChangeEvent<HTMLInputElement>) => {
					setFilter(ev.target.value);
				}}
			/>
			<ul>
				{filteredBooks.map((b) => (
					<li key={b.name}>{b.name}</li>
				))}
			</ul>
			<p>
				<Link to={"/use-memo"}>Fixed example</Link>
			</p>
		</section>
	);
}
