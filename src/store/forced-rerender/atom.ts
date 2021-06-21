import { Atom } from "@dbeining/react-atom";

export const initialState: boolean = true;

export const forcedRerenderAtom = Atom.of(initialState);
