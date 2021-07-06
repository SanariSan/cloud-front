import { b64Decode, b64Encode } from "../../helpers/core";
import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqFsBrowse = ({ groupId, path }) =>
	handleRequest(axiosApiBase.get)({
		path: prepareURI("/fs/browse-folder", `${groupId}-${b64Encode(path)}`),
		headers: {
			...getBearerHeader(),
		},
	}).then(({ data }) => ({
		files: data.files.map(b64Decode),
		folders: data.folders.map(b64Decode),
	}));

export { reqFsBrowse };
