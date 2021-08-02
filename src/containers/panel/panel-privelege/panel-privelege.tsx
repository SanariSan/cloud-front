import { useAtom } from "@dbeining/react-atom";
import React, { useEffect, useRef } from "react";
import { PanelPrivelegeComponent } from "../../../components/panel";
import { ResponseStatus } from "../../../helpers/services";
import { reqPrivelege100, reqPrivelege500 } from "../../../services/group";
import { toggleBlockLoader } from "../../../store/block-loader";
import { forceRerender } from "../../../store/forced-rerender";
import { translateAtom } from "../../../store/translate";

const PanelPrivelegeContainer: React.FC = () => {
	const isActive = useRef(true);
	const translated = useAtom(translateAtom);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	const handleBuy100 = async () => {
		if (!isActive.current) return;

		toggleBlockLoader(true);

		const res = await reqPrivelege100().catch((err) => {
			if ([ResponseStatus.BAD_REQUEST, ResponseStatus.FORBIDDEN].includes(err.status)) {
				alert(err.message);
			}
		});

		toggleBlockLoader(false);

		if (!res) return;

		alert(res.message);
		forceRerender();
	};

	const handleBuy500 = async () => {
		if (!isActive.current) return;

		toggleBlockLoader(true);

		const res = await reqPrivelege500().catch((err) => {
			if ([ResponseStatus.BAD_REQUEST, ResponseStatus.FORBIDDEN].includes(err.status)) {
				alert(err.message);
			}
		});

		toggleBlockLoader(false);

		if (!res) return;

		alert(res.message);
		forceRerender();
	};

	return (
		<PanelPrivelegeComponent
			handleBuy100={handleBuy100}
			handleBuy500={handleBuy500}
			translated={translated}
		/>
	);
};

export { PanelPrivelegeContainer };
