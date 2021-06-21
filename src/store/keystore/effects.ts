import { swap } from "@libre/atom";
import { setLSValue } from "../../helpers/browser";
import { keystoreAtom } from "./atom";

export const updateKeystore = (accessToken, refreshToken) => {
	setLSValue("accessToken", accessToken);
	setLSValue("refreshToken", refreshToken);
	swap(keystoreAtom, (state) => ({
		accessToken,
		refreshToken,
	}));
};
