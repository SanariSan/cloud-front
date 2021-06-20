import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqFsBrowse = ({ groupId, path }) =>
	handleRequest(axiosApiBase.get)({
		path: prepareURI("/fs/browse-folder", `${groupId}-${path}`),
		headers: {
			...getBearerHeader(),
		},
	});

export { reqFsBrowse };
