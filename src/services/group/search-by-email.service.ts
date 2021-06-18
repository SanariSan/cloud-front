import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const groupSearchByEmail = ({ ownerEmail }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/search-by-email"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			ownerEmail,
		},
	});

export { groupSearchByEmail };
