import { deref } from "@dbeining/react-atom";
import { keystoreAtom } from "../../store/keystore";
import { TPath } from "../../services/request-base";

const getBearerHeader = () => {
	const { accessToken, refreshToken } = deref(keystoreAtom);
	return { Authorization: `Bearer ${accessToken}` };
};

const prepareURI = (basePart: TPath, encodePart = "") => {
	return `${basePart}/${encodeURIComponent(encodePart)}`;
};

export { getBearerHeader, prepareURI };
