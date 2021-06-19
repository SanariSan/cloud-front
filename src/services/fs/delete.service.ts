import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const fsDelete = ({ groupId, path, filename }) =>
	handleRequest(axiosApiBase.delete)({
		path: prepareURI("/fs/delete-file-folder", `${groupId}-${path}-${filename}`),
		headers: {
			...getBearerHeader(),
		},
	});

export { fsDelete };
