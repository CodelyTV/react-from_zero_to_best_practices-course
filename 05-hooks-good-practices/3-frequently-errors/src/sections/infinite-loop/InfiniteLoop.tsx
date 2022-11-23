/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Book, search } from "../../infrastructure/BookSearcher";

export function InfiniteLoop() {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		search().then((books) => setBooks(books));
	});

	return (
		<section>
			<h1>Infinite loop in useEffect</h1>

			<ul>
				{books.map((book) => (
					<li key={book.id}>{book.title}</li>
				))}
			</ul>

			<p>
				<Link to={"/infinite-loop-fixed"}>Fixed example</Link>
			</p>
		</section>
	);
}
