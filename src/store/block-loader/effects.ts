import { swap } from "@libre/atom";
import { blockLoaderAtom } from "./atom";

export const toggleBlockLoader = (val) => {
	swap(blockLoaderAtom, (state) => val);
};
