/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Book, search } from "../../infrastructure/BookSearcher";

export function UseStatePrevValue() {
	const [books, setBooks] = useState<Book[]>([]);
	const [page, setPage] = useState(0);

	function incrementPage() {
		setPage(page + 1);
	}

	useEffect(() => {
		search(page).then((newBooks) => setBooks(books.concat(newBooks)));
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
			<p>
				<Link to={"/use-state-prev-value-fixed"}>Fixed example</Link>
			</p>
		</section>
	);
}
