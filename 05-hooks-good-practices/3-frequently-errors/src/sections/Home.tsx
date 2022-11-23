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
				<li>
					<Link to={"/use-state-prev-value"}>Modify prev state value from useState value</Link>
				</li>
				<li>
					<Link to={"/use-effect-return"}>No use useEffect return callback</Link>
				</li>
			</ul>
		</section>
	);
}
