import { prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const accessRegister = ({ email, password }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/access/register"),
		data: {
			email,
			password,
		},
	});

export { accessRegister };
