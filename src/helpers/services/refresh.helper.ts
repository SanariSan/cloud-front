import { deref } from "@dbeining/react-atom";
import { changeRoute } from "../../components/history";
import { reqAccessRefresh } from "../../services/access";
import { keystoreAtom, updateKeystore } from "../../store/keystore";

const triggerRefresh = async () => {
	const { accessToken, refreshToken } = deref(keystoreAtom);

	if (refreshToken) {
		const res = await reqAccessRefresh({ refreshToken }).catch((err) => {
			console.warn("Could not refresh ", err);
		});

		if (res && res.data && res.data.accessToken && res.data.refreshToken) {
			const { accessToken, refreshToken } = res.data;

			updateKeystore(accessToken, refreshToken);
			changeRoute("/auth");
			return;
		}
	}

	updateKeystore(null, null);
	changeRoute("/auth");
};

export { triggerRefresh };
