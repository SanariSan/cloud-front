import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const fsRename = ({ groupId, path, filename }) =>
	handleRequest(axiosApiBase.patch)({
		path: prepareURI("/fs/rename-file-folder", `${groupId}-${path}-${filename}`),
		headers: {
			...getBearerHeader(),
		},
	});

export { fsRename };
