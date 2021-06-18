import { DEFAULT_HEADERS } from "./request-base.service.const";
import { IRequest } from "./request-base.service.type";
import axios, { AxiosInstance } from "axios";
import { handleResponse } from "../../helpers/services/response.helper";

const url = <string>process.env.URL; //"https://storeton.herokuapp.com"
const host = <string>process.env.HOST;
const port = parseInt(<string>process.env.PORT);
const apiVersion = <string>process.env.API_VERSION; //"v1"

const axiosApiBase: AxiosInstance = axios.create({
	baseURL: url ? url : `${host}:${port}/${apiVersion}`,
	headers: DEFAULT_HEADERS,
	timeout: 10000,
});

const handleRequest =
	(req) =>
	({ path, headers, data }: IRequest) =>
		req(path, data, { headers })
			.then(handleResponse)
			.catch((err) => console.log(err));

export { handleRequest, axiosApiBase };
