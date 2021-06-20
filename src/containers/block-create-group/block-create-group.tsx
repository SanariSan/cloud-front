import React, { useEffect, useRef } from "react";
import { BlockCreateGroupComponent } from "../../components/block-create-group";
import { changeRoute } from "../../components/history";
import { useLocalStorage } from "../../hooks";
import { reqProfileInfo } from "../../services/get-info";
import { reqGroupCreate } from "../../services/group";

const BlockCreateGroupContainer: React.FC<any> = ({ userGroupsInfo, setUserGroupsInfo }) => {
	const isActive = useRef(true);
	const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
	const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	useEffect(() => {
		if (isActive.current) reqProfileInfo().catch((err) => {});
	}, [accessToken, refreshToken]);

	const handleGroupCreate = (name, password) => {
		// group: {id, name},
		// size: {sizeUsed, sizeMax}

		reqGroupCreate({ groupName: name, password })
			.then(async ({ code, message, data }) => {
				console.log(data);
				await setUserGroupsInfo([...userGroupsInfo, data.group]);
			})
			.then(() => changeRoute("/panel/browse"))
			.catch((err) => {
				console.warn(err);
			});
	};

	return <BlockCreateGroupComponent handleGroupCreate={handleGroupCreate} />;
};

export { BlockCreateGroupContainer };
