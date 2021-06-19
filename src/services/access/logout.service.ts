import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const accessLogout = () => {
	// axiosApiBase();
	return handleRequest(axiosApiBase.delete)({
		path: prepareURI("/access/logout"),
		headers: {
			...getBearerHeader(),
		},
	});
};

export { accessLogout };