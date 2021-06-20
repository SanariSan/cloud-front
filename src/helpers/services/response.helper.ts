import { AxiosError, AxiosResponse } from "axios";
import { changeRoute } from "../../components/history";
import { reqAccessRefresh } from "../../services/access";
import { delLSValue, getLSValue, setLSValue } from "../browser";
import { ResponseStatus, StatusCode } from "./services.type";

const handleSuccessResponse = async (response: AxiosResponse): Promise<any> => {
	if (typeof response.data === "object") {
		const res = {
			code: response.data.statusCode, //3000 only, StatusCode.SUCCESS
			message: response.data.message, //show to user
			data: response.data.data, //use in code
		};

		return res;
	} else {
		//return raw data, probably file download, binary
		return response.data;
	}
};

const handleErrorResponse = async (response: AxiosError): Promise<any> => {
	if (response.response) {
		if (
			response.response.status && // HTTP ResponseStatus
			response.response.data.statusCode && // Custom StatusCode
			response.response.data.message // Custom error message
		) {
			// GOOD
			// perfectly handled on backend
			const err = {
				status: response.response.status,
				code: response.response.data.statusCode,
				message: response.response.data.message,
			};

			console.warn(err);

			if (err.code === StatusCode.INVALID_ACCESS_TOKEN) {
				//clear local storadge and force refresh
				// call METHOD REFRESH
				const refresh = getLSValue("refreshToken");
				refresh
					? await reqAccessRefresh({ refreshToken: refresh })
					: delLSValue("accessToken");
				changeRoute("/auth");

				console.log(1);
				throw err;
			} else if (err.code === StatusCode.FAILURE) {
				if (
					err.status === ResponseStatus.UNAUTHORIZED ||
					err.status === ResponseStatus.FORBIDDEN
				) {
					//user is doing something sketchy, clear local storadge and force refresh
					// call METHOD REFRESH
					const refresh = getLSValue("refreshToken");
					refresh
						? await reqAccessRefresh({ refreshToken: refresh })
						: delLSValue("accessToken");
					changeRoute("/auth");

					console.log(2);
					throw err;
				} else if (err.status === ResponseStatus.NOT_FOUND) {
					//when method not found
					//won't happen in current version, because any
					//call not matching api RETURNS STATIC REACT PAGE
					//could be changed by removing /* in app.ts on backend

					console.log(3);
				} else if (err.status === ResponseStatus.BAD_REQUEST) {
					//user entered bad data, result to show!

					console.log(4);
					throw err;
				} else if (err.status === ResponseStatus.INTERNAL_ERROR) {
					//something bad happened, throw and show internal err msg

					console.log(5);
					throw err;
				}
			}
		} else {
			// CODE TYPO OR UNHANDLED SERVER ERROR
			console.log(6);
			console.error(response);
		}
	}
};

export { handleSuccessResponse, handleErrorResponse };
