import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqGroupCreate = ({ groupName, password }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/create"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			groupName,
			password,
		},
	});

export { reqGroupCreate };
