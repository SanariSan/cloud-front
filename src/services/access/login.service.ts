import { prepareURI } from "../../helpers/services";
import { axiosApiBase, handleRequest } from "../request-base";

/*
"code": "3000",
"message": "Login Success",
"data": {
    "user": {
        "id": 1,
        "name": null,
        "email": "sam@sam.com",
        "profilePicUrl": null
    },
    "tokens": {
        "accessToken": "sample",
        "refreshToken": "sample"
    }
}
*/

const reqAccessLogin = ({ email, password }) =>
	handleRequest(axiosApiBase.post)({
		path: prepareURI("/access/login"),
		data: {
			email,
			password,
		},
	});

export { reqAccessLogin };
