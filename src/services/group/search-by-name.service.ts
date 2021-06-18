import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const groupSearchByName = ({ groupName }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/search-by-name"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			groupName,
		},
	});

export { groupSearchByName };
