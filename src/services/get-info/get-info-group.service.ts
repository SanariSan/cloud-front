import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqGroupInfo = ({ id }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/info/info-group"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			id,
		},
	});

export { reqGroupInfo };
