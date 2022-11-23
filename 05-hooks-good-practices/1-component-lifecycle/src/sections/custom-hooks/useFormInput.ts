import { useState } from "react";

export function useFormInput(initialValue: string): {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} {
	const [value, setValue] = useState<string>(initialValue);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setValue(event.target.value);
	}

	return {
		value,
		onChange: handleChange,
	};
}
