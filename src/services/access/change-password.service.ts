import { getBearerHeader, prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const reqAccessChangePassword = ({ oldPassword, newPassword }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/access/change-password"),
		headers: {
			...getBearerHeader(),
		},
		data: {
			oldPassword,
			newPassword,
		},
	});

export { reqAccessChangePassword };
