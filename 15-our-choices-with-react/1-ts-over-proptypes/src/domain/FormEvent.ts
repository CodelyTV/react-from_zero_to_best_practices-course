export type FormEvent<T> = React.FormEvent<HTMLFormElement> & {
	target: { elements: { [key in keyof T]: { value: T[key] } } };
};
