import { swap } from "@libre/atom";
import { setLSValue } from "../../helpers/browser";
import { currentGroupInfoAtom } from "./atom";

export const updateCurrentGroupInfo = (el) => {
	setLSValue("currentGroupInfo", el);
	swap(currentGroupInfoAtom, (state) => el);
};
