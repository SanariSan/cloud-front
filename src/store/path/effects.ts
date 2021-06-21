import { swap } from "@libre/atom";
import { pathAtom } from "./atom";

export const updatePath = (path) => {
	swap(pathAtom, (state) => path);
};
