import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqProfileInfo = () =>
	handleRequest(axiosApiBase.get)({
		path: prepareURI("/info/info-profile"),
		headers: {
			...getBearerHeader(),
		},
	});

export { reqProfileInfo };
