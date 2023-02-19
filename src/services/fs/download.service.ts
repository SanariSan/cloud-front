import { b64Encode } from "../../helpers/core";
import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqFsDownload = ({ groupId, path, filename }) => {
	const url = prepareURI(
		"/fs/download-file",
		`${groupId}-${b64Encode(path)}-${b64Encode(filename)}`,
	);
	return handleRequest(axiosApiBase.get)({
		path: url,
		headers: {
			...getBearerHeader(),
		},
		extra: {
			responseType: "arraybuffer",
			timeout: 0,
		},
	});
};
export { reqFsDownload };
