import { DEFAULT_HEADERS } from "./request-base.service.const";
import { IRequest } from "./request-base.service.type";
import axios, { AxiosInstance } from "axios";
import { handleErrorResponse, handleSuccessResponse } from "../../helpers/services/response.helper";

const url = process.env.REACT_APP_URL as string;
const localUrl = process.env.REACT_APP_LOCAL_URL as string;
const apiVersion = process.env.REACT_APP_API_VERSION as string;

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`REACT_APP_NODE_ENV: ${process.env.REACT_APP_NODE_ENV}`);
console.log(`REACT_APP_URL: ${process.env.REACT_APP_URL ?? process.env.REACT_APP_LOCAL_URL}`);

const axiosApiBase: AxiosInstance = axios.create({
	baseURL:
		(process.env.REACT_APP_NODE_ENV as string) === "production"
			? `${url}/${apiVersion}`
			: `${localUrl}/${apiVersion}`,
	headers: DEFAULT_HEADERS,
	timeout: 10000,
});

const handleRequest =
	(req) =>
	({ path, headers, data, extra }: IRequest): Promise<any> =>
		req(path, data ? data : { ...extra, headers }, { ...extra, headers })
			.then(handleSuccessResponse)
			.catch(handleErrorResponse);
export { handleRequest, axiosApiBase };
