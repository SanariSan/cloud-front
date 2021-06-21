import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqFsCreate = ({ groupId, path, filename }) =>
	handleRequest(axiosApiBase.put)({
		path: prepareURI("/fs/create-folder", `${groupId}-${path}-${filename}`),
		headers: {
			...getBearerHeader(),
		},
		data: {},
	});

export { reqFsCreate };
