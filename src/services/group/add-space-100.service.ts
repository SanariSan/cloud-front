import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqPrivelege100 = () =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/add100"),
		headers: {
			...getBearerHeader(),
		},
		data: {},
	});

export { reqPrivelege100 };
