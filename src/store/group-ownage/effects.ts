import { swap } from "@libre/atom";
import { setLSValue } from "../../helpers/browser";
import { groupOwnageAtom } from "./atom";

export const updateGroupOwnage = (obj) => {
	setLSValue("userGroupOwnage", obj);
	swap(groupOwnageAtom, (state) => obj);
};
