import { Atom } from "@dbeining/react-atom";
import { getLSValue } from "../../helpers/browser";

export const initialState: { id; name; email; profilePicUrl } | null = getLSValue("profileInfo");

export const profileInfoAtom = Atom.of(initialState);
