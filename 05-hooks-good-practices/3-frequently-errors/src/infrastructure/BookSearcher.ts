export interface Book {
	id: number;
	title: string;
}

export async function search(index = 0): Promise<Book[]> {
	return fetch("https://gutendex.com/books")
		.then<{ results: Book[] }>((response) => response.json())
		.then((json) => {
			return json.results.slice(index, 10).map((book) => ({ id: book.id, title: book.title }));
		});
}
