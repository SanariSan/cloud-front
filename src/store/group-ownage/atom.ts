import { Atom } from "@dbeining/react-atom";
import { getLSValue } from "../../helpers/browser";

export const initialState: { id } | null = getLSValue("userGroupOwnage");

export const groupOwnageAtom = Atom.of(initialState);
