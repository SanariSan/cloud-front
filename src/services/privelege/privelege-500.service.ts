import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiServiceBase, handleRequest } from "../request-base";

const reqPrivelege500 = () =>
	handleRequest(axiosApiServiceBase.post)({
		path: prepareURI("/services/payment/add500"),
		headers: {
			...getBearerHeader(),
		},
		data: {},
	});

export { reqPrivelege500 };
