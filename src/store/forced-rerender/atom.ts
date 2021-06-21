import { Atom } from "@dbeining/react-atom";
import { getLSValue } from "../../helpers/browser";

export const initialState: boolean = true;

export const forcedRerenderAtom = Atom.of(initialState);
