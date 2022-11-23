/* eslint-disable no-console */
import { useEffect, useState } from "react";

import { Book, search } from "../../infrastructure/BookSearcher";

export function InfiniteLoopFixed() {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		search().then((books) => setBooks(books));
	}, []);

	return (
		<section>
			<h1>Infinite loop in useEffect</h1>

			<ul>
				{books.map((book) => (
					<li key={book.id}>{book.title}</li>
				))}
			</ul>
		</section>
	);
}
