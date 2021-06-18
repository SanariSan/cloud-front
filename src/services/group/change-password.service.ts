import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const groupChangePassword = ({ oldPassword, newPassword }) =>
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

export { groupChangePassword };
