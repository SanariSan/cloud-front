import { useState } from "react";
import { getLSValue, setLSValue } from "../helpers/browser";

const useLocalStorage = (key: any, initialValue: any) => {
	const [storedValue, setStoredValue] = useState(() => {
		const item = getLSValue(key);
		return item ? item : initialValue;
	});

	const setValue = (value: any) => {
		const valueToStore = value instanceof Function ? value(storedValue) : value;
		setStoredValue(valueToStore);
		setLSValue(key, valueToStore);
	};

	return [storedValue, setValue];
};

export { useLocalStorage };
