import { deref, swap } from "@libre/atom";
import { translateAtom } from "./atom";
import { setLSValue } from "../../helpers/browser";

export const toggleTranslate = () => {
	swap(translateAtom, (state) => !state);
	setLSValue("translate", deref(translateAtom));
};
