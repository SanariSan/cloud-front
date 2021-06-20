import { DEFAULT_HEADERS } from "./request-base.service.const";
import { IRequest } from "./request-base.service.type";
import axios, { AxiosInstance } from "axios";
import { handleErrorResponse, handleSuccessResponse } from "../../helpers/services/response.helper";

const url = <string>process.env.REACT_APP_URL;
const host = <string>process.env.REACT_APP_HOST;
const port = parseInt(<string>process.env.REACT_APP_PORT);
const apiVersion = <string>process.env.REACT_APP_API_VERSION;

const axiosApiBase: AxiosInstance = axios.create({
	baseURL: url ? `${url}/${apiVersion}` : `${host}:${port}/${apiVersion}`,
	headers: DEFAULT_HEADERS,
	timeout: 10000,
});

const handleRequest =
	(req) =>
	({ path, headers, data }: IRequest) => {
		const options = {
			headers: {
				...headers,
			},
		};

		return req(path, data ? data : options, options)
			.then(handleSuccessResponse)
			.catch(handleErrorResponse);
	};
export { handleRequest, axiosApiBase };
