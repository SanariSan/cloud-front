import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqGroupLeave = ({ groupId }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/leave"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			groupId,
		},
	});

export { reqGroupLeave };
