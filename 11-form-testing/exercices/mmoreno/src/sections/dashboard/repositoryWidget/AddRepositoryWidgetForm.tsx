import React, { useState } from "react";

import { ReactComponent as Add } from "../../../assets/svgs/add.svg";
import { RepositoryWidgetRepository } from "../../../domain/RepositoryWidgetRepository";
import styles from "./AddRepositoryWidgetForm.module.scss";
import { useAddRepositoryWidget } from "./useAddRepositoryWidget";
import { useValidateUrlRepositoryWidget } from "./useValidateUrlRepositoryWidget";

type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};

type FormFields = { id: string; repositoryUrl: string };

export function AddRepositoryWidgetForm({
	repository,
}: {
	repository: RepositoryWidgetRepository;
}) {
	const [isFormActive, setIsFormActive] = useState(false);
	const [hasAlreadyExistsError, setHasAlreadyExistsError] = useState(false);
	const [isValidUrl, setIsValidUrl] = useState(true);
	const { ensureIsValidUrl } = useValidateUrlRepositoryWidget();
	const { save } = useAddRepositoryWidget(repository);

	const submitForm = async (ev: FormEvent<FormFields>) => {
		ev.preventDefault();
		const { id, repositoryUrl } = ev.target.elements;
		const error = await save({ id: id.value, repositoryUrl: repositoryUrl.value });
		setIsValidUrl(ensureIsValidUrl(repositoryUrl.value));
		setHasAlreadyExistsError(!!error);
		setIsFormActive(false);
	};

	const checkUrlRepository = async (ev: React.FocusEvent<HTMLInputElement>) => {
		ev.preventDefault();
		const t = ev.target.value;
		setIsValidUrl(ensureIsValidUrl(t));
	};

	return (
		<article className={styles.add_widget}>
			<div className={styles.container}>
				{!isFormActive && !hasAlreadyExistsError ? (
					<button onClick={() => setIsFormActive(true)} className={styles.add_button}>
						<Add />
						<p>Añadir repositorio</p>
					</button>
				) : (
					<form className={styles.form} onSubmit={submitForm}>
						<div>
							<label htmlFor="id">Id</label>
							<input type="text" name="id" id="id" />
						</div>
						<div>
							<label htmlFor="repositoryUrl">Url del repositorio</label>
							<input
								type="text"
								capture
								name="repositoryUrl"
								id="repositoryUrl"
								onBlurCapture={checkUrlRepository}
							/>
						</div>

						{hasAlreadyExistsError && (
							<p className={styles.error} role="alert" aria-describedby="duplicated-error">
								<span id="duplicated-error">Repositorio duplicado</span>
							</p>
						)}

						{!isValidUrl && (
							<p className={styles.error} role="alert" aria-describedby="invalid-url-error">
								<span id="invalid-url-error">Url no valida</span>
							</p>
						)}

						<div>
							<input type="submit" value="Añadir" disabled={!isValidUrl} />
						</div>
					</form>
				)}
			</div>
		</article>
	);
}
