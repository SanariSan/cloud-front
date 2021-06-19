import { getLSValue } from "../browser";

const getBearerHeader = () => {
	const key = getLSValue("accessToken");
	return { Authorization: `Bearer ${key}` };
};

export { getBearerHeader };
