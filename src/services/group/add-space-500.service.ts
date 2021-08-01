import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqPrivelege500 = () =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/add500"),
		headers: {
			...getBearerHeader(),
		},
		data: {},
	});

export { reqPrivelege500 };
