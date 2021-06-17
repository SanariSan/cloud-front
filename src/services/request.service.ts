import { config } from "../config";
import { RequestBuilder } from "../helpers/services";
import { DEFAULT_HEADERS } from "./request.const";
import { IRequest } from "./request.service.type";

const RequestService = {
	get: async ({ path, headers: extraHeaders = {}, data: extraData = {} }: IRequest) => {
		const requestOptions: RequestInit = new RequestBuilder()
			.makeMethod("GET")
			.makeHeaders({
				...extraHeaders,
				...DEFAULT_HEADERS,
			})
			.getRequest();

		const response = await fetch(`${config.apiUrl}/${path}`, requestOptions);
		return response.json();
	},
	post: async ({ path, headers: extraHeaders = {}, data: extraData = {} }: IRequest) => {
		//convert data to formdata
		const requestOptions: RequestInit = new RequestBuilder()
			.makeMethod("POST")
			.makeHeaders({
				...DEFAULT_HEADERS,
			})
			.makeBody(extraData)
			.getRequest();

		const response = await fetch(`${config.apiUrl}/${path}`, requestOptions);
		return response.json();
	},
};

export { RequestService };
