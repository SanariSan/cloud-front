import mime from "mime-types";
import { b64Encode } from "../../helpers/core";
import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqFsUpload = ({ groupId, path, filename, data }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/fs/upload-file", `${groupId}-${b64Encode(path)}-${b64Encode(filename)}`),
		headers: {
			...getBearerHeader(),
			"Content-Type": mime.contentType(filename) || "application/binary",
		},
		data,
	});

export { reqFsUpload };
