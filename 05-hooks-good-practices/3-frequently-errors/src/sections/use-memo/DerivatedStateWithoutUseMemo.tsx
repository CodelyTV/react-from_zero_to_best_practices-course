import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Book, search } from "../../infrastructure/BookSearcher";

export function DerivatedStateWithoutUseMemo() {
	const [books, setBooks] = useState<Book[]>([]);
	const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		search().then((books) => setBooks(books));
	}, []);

	useEffect(() => {
		setFilteredBooks(
			books.filter((book) => book.title.toUpperCase().includes(filter.toUpperCase()))
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
					<li key={b.title}>{b.title}</li>
				))}
			</ul>
			<p>
				<Link to={"/use-memo"}>Fixed example</Link>
			</p>
		</section>
	);
}
