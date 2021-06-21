import { swap } from "@libre/atom";
import { setLSValue } from "../../helpers/browser";
import { currentGroupInfoAtom } from "./atom";

export const updateCurrentGroupInfo = (obj) => {
	setLSValue("currentGroupInfo", obj);
	swap(currentGroupInfoAtom, (state) => obj);
};
