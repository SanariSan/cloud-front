import { Atom } from "@dbeining/react-atom";
import { getLSValue } from "../../helpers/browser";

export const initialState: { accessToken: string | null; refreshToken: string | null } = {
	accessToken: getLSValue("accessToken"),
	refreshToken: getLSValue("refreshToken"),
};

export const keystoreAtom = Atom.of(initialState);
