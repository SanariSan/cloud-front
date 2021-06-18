import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const accessRefresh = ({ refreshToken }) =>
	handleRequest(axiosApiBase.put)({
		path: prepareURI("/access/refresh"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			refreshToken,
		},
	});

export { accessRefresh };
