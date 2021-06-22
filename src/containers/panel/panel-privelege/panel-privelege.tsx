import React, { useEffect, useRef } from "react";
import { PanelPrivelegeComponent } from "../../../components/panel";
import { ResponseStatus } from "../../../helpers/services";
import { reqPrivelege100, reqPrivelege500 } from "../../../services/privelege";
import { toggleBlockLoader } from "../../../store/block-loader";
import { forceRerender } from "../../../store/forced-rerender";

const PanelPrivelegeContainer: React.FC = () => {
	const isActive = useRef(true);

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

	return <PanelPrivelegeComponent handleBuy100={handleBuy100} handleBuy500={handleBuy500} />;
};

export { PanelPrivelegeContainer };
