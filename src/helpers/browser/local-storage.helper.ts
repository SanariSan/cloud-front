const getLSValue = (key) => {
	const item = window.localStorage.getItem(key);
	let parsed = null;
	try {
		parsed = item ? JSON.parse(item) : null;
	} catch (e) {
		console.warn("No key in local storage, please clear cookies and refresh");
	}

	return parsed;
};

const setLSValue = (key, value) => {
	const valueStr = JSON.stringify(value);
	window.localStorage.setItem(key, valueStr);
};

const delLSValue = (key) => {
	window.localStorage.removeItem(key);
};

export { getLSValue, setLSValue, delLSValue };
