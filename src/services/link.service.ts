import { config } from "../config";
import { defaultHeaders, RequestBuilder } from "../helpers";

const LinkService = {
	request: async () => {
		const requestOptions: RequestInit = new RequestBuilder()
			.makeMethod("GET")
			.makeHeaders({
				...defaultHeaders(),
			})
			.getRequest();

		const response = await fetch(`${config.apiUrl}/`, requestOptions);
		return response.json();
	},
};

export { LinkService };
