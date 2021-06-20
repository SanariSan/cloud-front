import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqGroupChangePassword = ({ oldPassword, newPassword }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/group/change-password"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			oldPassword,
			newPassword,
		},
	});

export { reqGroupChangePassword };
