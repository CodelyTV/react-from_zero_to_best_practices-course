import styles from "./Dashboard.module.scss";
import { SaluteWithPropTypes } from "./SaluteWithPropTypes";

export function DashboardJs() {
	return (
		<>
			<section className={styles.container}>
				<SaluteWithPropTypes age={"dasdas"} />
			</section>
		</>
	);
}
