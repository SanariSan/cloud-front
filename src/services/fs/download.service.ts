import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const fsDownload = ({ groupId, path, filename }) => {
	const url = prepareURI("/fs/download-file", `${groupId}-${path}-${filename}`);
	return handleRequest(axiosApiBase.get)({
		path: url,
		headers: {
			...getBearerHeader(),
		},
	});
};
export { fsDownload };
