import { Atom } from "@dbeining/react-atom";
import { getLSValue } from "../../helpers/browser";

export const initialState: boolean = getLSValue("translate") || false;

export const translateAtom = Atom.of(initialState);
