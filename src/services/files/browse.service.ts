import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const filesBrowse = ({ groupId, path }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/files/browse/", `${groupId}-${path}`),
		headers: {
			...getBearerHeader(),
		},
	});

export { filesBrowse };
