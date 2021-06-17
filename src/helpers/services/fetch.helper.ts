const handleResponse = (response: Response): any => {
	return new Promise(async (resolve, reject) => {
		const data = await response.json();
		if (data.status === "failure") {
			if ([401, 403].indexOf(data.code) !== -1) {
			}
			reject(data);
		} else {
			resolve(data);
		}
	});
};

export { handleResponse };
