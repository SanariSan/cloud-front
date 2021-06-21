import mime from "mime-types";
import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, DEFAULT_HEADERS, handleRequest } from "../request-base";

const reqFsUpload = ({ groupId, path, filename, data }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/fs/upload-file", `${groupId}-${path}-${filename}`),
		headers: {
			...getBearerHeader(),
			"Content-Type": mime.contentType(filename) || DEFAULT_HEADERS["Content-Type"],
		},
		data,
	});

export { reqFsUpload };
