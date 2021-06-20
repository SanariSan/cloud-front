import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqGroupJoin = ({ groupId, password }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/join"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			groupId,
			password,
		},
	});

export { reqGroupJoin };
