import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const groupLeave = ({ groupId }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/leave"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			groupId,
		},
	});

export { groupLeave };
