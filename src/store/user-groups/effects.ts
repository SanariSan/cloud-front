import { swap } from "@libre/atom";
import { setLSValue } from "../../helpers/browser";
import { userGroupsListAtom } from "./atom";

export const updateUserGroupsList = (arr) => {
	setLSValue("userGroupsList", arr);
	swap(userGroupsListAtom, (state) => arr);
};
