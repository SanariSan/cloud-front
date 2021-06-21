import { swap } from "@libre/atom";
import { forcedRerenderAtom } from "./atom";

export const forceRerender = () => {
	swap(forcedRerenderAtom, (state) => !state);
};
