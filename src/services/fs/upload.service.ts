import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const fsUpload = ({ groupId, path, filename, data }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/fs/upload-file", `${groupId}-${path}-${filename}`),
		headers: {
			...getBearerHeader(),
		},
		data, //INSPECT CLOSER
	});

export { fsUpload };
