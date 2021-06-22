import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiServiceBase, handleRequest } from "../request-base";

const reqPrivelege100 = () =>
	handleRequest(axiosApiServiceBase.post)({
		path: prepareURI("/services/payment/add100"),
		headers: {
			...getBearerHeader(),
		},
		data: {},
	});

export { reqPrivelege100 };
