const handleResponse = async (response: Response): Promise<any> => {
	const data = await response.json();

	if (data.status === "failure") {
		if ([401, 403].indexOf(data.code) !== -1) {
		}
		return Promise.reject(data);
	} else {
		return Promise.resolve(data);
	}
};

export { handleResponse };
