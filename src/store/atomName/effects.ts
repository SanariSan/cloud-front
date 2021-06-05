import { swap } from "@libre/atom";
import { exampleAtom, initialState } from "./atom";

export const example = () => {
	swap(exampleAtom, (state) => ({ ...initialState }));
};
