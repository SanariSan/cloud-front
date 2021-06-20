import { swap } from "@libre/atom";
import { forcePanelRerenderAtom, initialState } from "./atom";

export const forcePanelRerender = () => {
	swap(forcePanelRerenderAtom, (state) => !initialState);
};
