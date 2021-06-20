import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqGroupSearchByEmail = ({ ownerEmail }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/search-by-email"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			ownerEmail,
		},
	});

export { reqGroupSearchByEmail };
