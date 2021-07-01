import { b64Encode } from "../../helpers/core";
import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqFsBrowse = ({ groupId, path }) =>
	handleRequest(axiosApiBase.get)({
		path: prepareURI("/fs/browse-folder", `${groupId}-${path === "/" ? "/" : b64Encode(path)}`),
		headers: {
			...getBearerHeader(),
		},
	});

export { reqFsBrowse };
