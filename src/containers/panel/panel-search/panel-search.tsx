import React, { useEffect, useRef, useState } from "react";
import { PanelSearchComponent } from "../../../components/panel";
import { reqGroupSearchByEmail, reqGroupSearchByName } from "../../../services/group";
import { toggleBlockLoader } from "../../../store/block-loader";

const PanelSearchContainer: React.FC = () => {
	const isActive = useRef(true);
	const [groupsFound, setGroupsFound] = useState<{ ownerId; groupId; groupName }[]>([]);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	const handleSearch = async (groupName, email) => {
		if (isActive.current) {
			toggleBlockLoader(true);

			let res;

			if (groupName) {
				res = await reqGroupSearchByName({ groupName }).catch();
			} else {
				res = await reqGroupSearchByEmail({ ownerEmail: email }).catch();
			}

			toggleBlockLoader(false);
			if (!res) {
				return;
			}

			setGroupsFound(res.data);
		}
	};

	return <PanelSearchComponent handleSearch={handleSearch} groupsFound={groupsFound} />;
};

export { PanelSearchContainer };
