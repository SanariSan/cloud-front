import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const profileInfo = () =>
	handleRequest(axiosApiBase.get)({
		path: prepareURI("/profile/info"),
		headers: {
			...getBearerHeader(),
		},
	});

export { profileInfo };
