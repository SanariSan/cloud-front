import { AxiosError, AxiosResponse } from "axios";
import { clearPersonalLocalStorage } from "../core";
import { triggerRefresh } from "./refresh.helper";
import { ResponseStatus, StatusCode } from "./response.helper.type";

let refreshTried = false;

const handleSuccessResponse = async (
	response: AxiosResponse,
): Promise<{ code; message; data } | string> => {
	// console.log(response);

	let res;
	if (response.data.data && response.data.message && response.data.statusCode) {
		res = {
			code: response.data.statusCode, //3000 only, StatusCode.SUCCESS
			message: response.data.message, //show to user
			data: response.data.data, //use in code
		};
	} else {
		res = response.data;
	}

	return res;
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
				// refresh
				if (!refreshTried) {
					refreshTried = true;
					setTimeout(() => {
						refreshTried = false;
					}, 60000);

					clearPersonalLocalStorage();
					await triggerRefresh();
				}

				console.log(1);
				throw err;
			} else if (err.code === StatusCode.FAILURE) {
				if (err.status === ResponseStatus.UNAUTHORIZED) {
					//refresh
					if (!refreshTried) {
						refreshTried = true;
						setTimeout(() => {
							refreshTried = false;
						}, 60000);

						clearPersonalLocalStorage();
						await triggerRefresh();
					}

					console.log(2);
					throw err;
				} else if (err.status === ResponseStatus.FORBIDDEN) {
					//no right to do something

					console.log(3);
					throw err;
				} else if (err.status === ResponseStatus.BAD_REQUEST) {
					//user entered bad data, result to show!

					console.log(4);
					throw err;
				} else if (err.status === ResponseStatus.INTERNAL_ERROR) {
					//something bad happened, throw and show internal err msg

					console.log(5);
					throw err;
				}
				// } else if (err.status === ResponseStatus.NOT_FOUND) {
				// 	//when method not found
				// 	//won't happen in current version, because any
				// 	//call not matching api RETURNS STATIC REACT PAGE
				// 	//could be changed by removing /* in app.ts on backend

				// 	console.log(6);
				// }
			}
		} else {
			// CODE TYPO OR UNHANDLED SERVER ERROR
			console.log(6);
			console.error(response);
		}
	}
};

export { handleSuccessResponse, handleErrorResponse };
