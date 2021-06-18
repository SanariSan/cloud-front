import { prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

const accessLogin = ({ email, password }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/access/login"),
		data: {
			email,
			password,
		},
	});

export { accessLogin };
