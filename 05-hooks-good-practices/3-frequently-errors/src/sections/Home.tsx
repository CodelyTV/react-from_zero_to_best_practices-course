import { Link } from "react-router-dom";

export function Home() {
	return (
		<section>
			<h1>Frequently hook errors</h1>
			<ul>
				<li>
					<Link to={"/infinite-loop"}>Infinite loop in useEffect</Link>
				</li>
				<li>
					<Link to={"/no-use-memo"}>Derivated state without useMemo</Link>
				</li>
			</ul>
		</section>
	);
}
