import { Link } from "react-router-dom";

export function Home() {
	return (
		<section>
			<h1>Component lifecycle</h1>
			<ul>
				<li>
					<Link to="/class">Class component</Link>
				</li>
				<li>
					<Link to="/hooks">Component with hooks</Link>
				</li>
			</ul>
		</section>
	);
}
