import { Atom } from "@dbeining/react-atom";
import { getLSValue } from "../../helpers/browser";

export const initialState: [{ id; name }] = getLSValue("userGroupsList") || [];

export const userGroupsListAtom = Atom.of(initialState);
