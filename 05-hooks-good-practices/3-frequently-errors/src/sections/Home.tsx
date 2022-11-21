import { Link } from "react-router-dom";

export function Home() {
	return (
		<section>
			<h1>Frequently hook errors</h1>
			<ul>
				<li>
					<Link to={"/infinite-loop"}>Infinite loop in useEffect</Link>
				</li>
			</ul>
		</section>
	);
}
