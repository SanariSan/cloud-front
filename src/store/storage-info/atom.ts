import { Atom } from "@dbeining/react-atom";
import { getLSValue } from "../../helpers/browser";

export const initialState: { sizeUsed; sizeMax } | null = getLSValue("storageInfo");

export const storageInfoAtom = Atom.of(initialState);
