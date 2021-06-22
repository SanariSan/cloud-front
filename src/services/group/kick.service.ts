import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqGroupKick = ({ groupId, userId }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/kick"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			groupId,
			userId,
		},
	});

export { reqGroupKick };
