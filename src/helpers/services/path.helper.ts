import { TPath } from "../../services/request-base";

const prepareURI = (basePart: TPath, encodePart = "") => {
	return `${basePart}/${encodeURIComponent(encodePart)}`;
};

export { prepareURI };
