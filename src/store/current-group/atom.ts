import { Atom } from "@dbeining/react-atom";
import { getLSValue } from "../../helpers/browser";

export const initialState: { id; name } = getLSValue("currentGroupInfo");

export const currentGroupInfoAtom = Atom.of(initialState);