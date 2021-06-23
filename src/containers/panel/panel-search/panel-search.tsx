import React, { useEffect, useRef, useState } from "react";
import { PanelSearchComponent } from "../../../components/panel";
import { ResponseStatus } from "../../../helpers/services";
import { reqGroupJoin, reqGroupSearchByEmail, reqGroupSearchByName } from "../../../services/group";
import { toggleBlockLoader } from "../../../store/block-loader";
import { forceRerender } from "../../../store/forced-rerender";

const PanelSearchContainer: React.FC = () => {
	const isActive = useRef(true);
	const [groupsFound, setGroupsFound] = useState<
		{
			ownerId;
			ownerName;
			ownerEmail;
			groupId;
			groupName;
		}[]
	>([]);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	const handleGroupSearch = async (groupName, email) => {
		if (!isActive.current) return;
		toggleBlockLoader(true);

		let res;

		if (groupName) {
			res = await reqGroupSearchByName({ groupName }).catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			});
		} else {
			res = await reqGroupSearchByEmail({ ownerEmail: email }).catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			});
		}

		toggleBlockLoader(false);

		if (!res) {
			return;
		}

		await setGroupsFound(res.data);
	};

	const handleGroupJoin = async ({ ownerId, groupId, groupName }) => {
		const password = prompt("Enter group password");

		if (!isActive.current || !password) return;

		toggleBlockLoader(true);

		await reqGroupJoin({ groupId, password })
			.then((data) => {
				alert(data.message);
			})
			.then(forceRerender)
			.catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			});

		toggleBlockLoader(false);
	};

	return (
		<PanelSearchComponent
			handleGroupSearch={handleGroupSearch}
			handleGroupJoin={handleGroupJoin}
			groupsFound={groupsFound}
		/>
	);
};

export { PanelSearchContainer };
