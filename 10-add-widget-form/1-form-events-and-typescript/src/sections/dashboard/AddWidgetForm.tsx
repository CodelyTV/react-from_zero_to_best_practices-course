import React, { useState } from "react";

import { ReactComponent as Add } from "../../assets/svgs/add.svg";
import styles from "./AddWidgetForm.module.scss";

type AddWidgetSubmitFormEvent = React.FormEvent<HTMLFormElement> & {
	target: { id: { value: string }; url: { value: string } };
};

export function AddWidgetForm() {
	const [isFormActive, setIsFormActive] = useState(false);

	const submitForm = (ev: AddWidgetSubmitFormEvent) => {
		ev.preventDefault();
		// Save new repository

		setIsFormActive(false);
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" id="id" />
						</div>
						<div>
							<label htmlFor="url">Url del repositorio</label>
							<input type="text" id="url" />
						</div>

						<div>
							<input type="submit" value={"Añadir"} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
