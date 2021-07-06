import { b64Encode } from "../../helpers/core";
import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqFsDelete = ({ groupId, path }) =>
	handleRequest(axiosApiBase.delete)({
		path: prepareURI("/fs/delete-file-folder", `${groupId}-${b64Encode(path)}`),
		headers: {
			...getBearerHeader(),
		},
	});

export { reqFsDelete };
