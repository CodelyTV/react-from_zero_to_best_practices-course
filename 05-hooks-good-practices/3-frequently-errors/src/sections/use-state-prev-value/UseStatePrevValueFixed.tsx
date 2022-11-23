/* eslint-disable no-console */
import { useEffect, useState } from "react";

import { Book, search } from "../../infrastructure/BookSearcher";

export function UseStatePrevValueFixed() {
	const [books, setBooks] = useState<Book[]>([]);
	const [page, setPage] = useState(0);

	function incrementPage() {
		setPage(page + 1);
	}

	useEffect(() => {
		search(page).then((newBooks) => setBooks((prevState) => prevState.concat(newBooks)));
	}, [page]);

	return (
		<section>
			<h1>Modify useState prev value</h1>
			<button onClick={incrementPage}>Next page: {page}</button>
			<ul>
				{books.map((b) => (
					<li key={b.title}>{b.title}</li>
				))}
			</ul>
		</section>
	);
}
