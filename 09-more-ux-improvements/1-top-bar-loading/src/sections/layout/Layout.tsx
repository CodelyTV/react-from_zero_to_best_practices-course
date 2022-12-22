import { Link, Outlet } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import { ReactComponent as Brand } from "./brand.svg";
import { ErrorBoundary } from "./ErrorBoundary";
import styles from "./Layout.module.scss";
import TopBarProgressByLocation from "./TopBarProgressByLocation";

TopBarProgress.config({
	barColors: {
		"0": "#fff",
		"1.0": "#3cff64",
	},
	shadowBlur: 5,
});

export function Layout() {
	return (
		<>
			<TopBarProgressByLocation />
			<header className={styles.header}>
				<section className={styles.header__container}>
					<a href="https://codely.com">
						<Brand />
					</a>
					<Link to={`/`}>
						<h1 className={styles.app__brand}>DevDash_</h1>
					</Link>
				</section>
			</header>
			<ErrorBoundary>
				<Outlet />
			</ErrorBoundary>
		</>
	);
}
