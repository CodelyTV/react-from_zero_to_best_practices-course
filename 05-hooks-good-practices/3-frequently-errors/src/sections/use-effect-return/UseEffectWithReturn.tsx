import { useEffect, useState } from "react";

import { Book, search } from "../../infrastructure/BookSearcher";

/* eslint-disable no-console */
export function UseEffectWithReturn() {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		search().then((books) => setBooks(books));
	}, []);

	useEffect(() => {
		const handleOnline = () => {
			search().then((books) => setBooks(books));
		};

		window.addEventListener("online", handleOnline);

		return () => {
			window.removeEventListener("online", handleOnline);
		};
	});

	return (
		<section>
			<h1>useEffect without return</h1>
			<ul>
				{books.map((book) => (
					<li key={book.id}>{book.title}</li>
				))}
			</ul>
		</section>
	);
}
