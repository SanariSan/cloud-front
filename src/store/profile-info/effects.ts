import { swap } from "@libre/atom";
import { setLSValue } from "../../helpers/browser";
import { profileInfoAtom } from "./atom";

export const updateProfileInfo = (data) => {
	setLSValue("profileInfo", data);
	swap(profileInfoAtom, (state) => data);
};
