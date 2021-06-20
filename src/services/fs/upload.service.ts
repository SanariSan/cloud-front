import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqFsUpload = ({ groupId, path, filename, data }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/fs/upload-file", `${groupId}-${path}-${filename}`),
		headers: {
			...getBearerHeader(),
		},
		data,
	});

export { reqFsUpload };
