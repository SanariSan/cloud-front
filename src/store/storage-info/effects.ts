import { swap } from "@libre/atom";
import { setLSValue } from "../../helpers/browser";
import { storageInfoAtom } from "./atom";

export const updateStorageInfo = (obj) => {
	setLSValue("storageInfo", obj);
	swap(storageInfoAtom, (state) => obj);
};
