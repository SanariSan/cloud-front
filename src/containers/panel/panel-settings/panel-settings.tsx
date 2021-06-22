import React, { useEffect, useRef, useState } from "react";
import { PanelSettingsComponent } from "../../../components/panel";
import { ResponseStatus } from "../../../helpers/services";
import { reqAccessChangePassword } from "../../../services/access";
import { reqGroupChangePassword } from "../../../services/group";
import { toggleBlockLoader } from "../../../store/block-loader";
import { forceRerender } from "../../../store/forced-rerender";

const PanelSettingsContainer: React.FC = () => {
	const isActive = useRef(true);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	const handleChnagePasswordAcc = async (oldPassword, newPassword) => {
		if (!isActive.current) return;

		toggleBlockLoader(true);

		const res = await reqAccessChangePassword({ oldPassword, newPassword }).catch((err) => {
			if ([ResponseStatus.BAD_REQUEST, ResponseStatus.FORBIDDEN].includes(err.status)) {
				alert(err.message);
			}
		});

		forceRerender();

		toggleBlockLoader(false);

		if (!res || !isActive.current) return;

		alert(res.message);
	};

	const handleChnagePasswordGroup = async (oldPassword, newPassword) => {
		if (!isActive.current) return;

		toggleBlockLoader(true);

		const res = await reqGroupChangePassword({ oldPassword, newPassword }).catch((err) => {
			if ([ResponseStatus.BAD_REQUEST, ResponseStatus.FORBIDDEN].includes(err.status)) {
				alert(err.message);
			}
		});

		forceRerender();

		toggleBlockLoader(false);

		if (!res || !isActive.current) return;

		alert(res.message);
	};

	return (
		<PanelSettingsComponent
			handleChnagePasswordAcc={handleChnagePasswordAcc}
			handleChnagePasswordGroup={handleChnagePasswordGroup}
		/>
	);
};

export { PanelSettingsContainer };
