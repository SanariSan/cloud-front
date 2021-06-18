import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const groupJoin = ({ groupId, password }) =>
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

export { groupJoin };
