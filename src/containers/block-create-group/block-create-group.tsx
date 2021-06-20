import React from "react";
import { useLocalStorage } from "../../hooks";

const BlockCreateGroupContainer: React.FC = () => {
	const [userGroupsInfo, setUserGroupsInfo] = useLocalStorage("userGroupsInfo", []);

	const handleGroupCreate = () => {
		//request create group
		// group: req.groupRepository.getRecord([EGROUP_KEYS.ID, EGROUP_KEYS.NAME]),
		// size: req.groupPathRepository.getRecord([
		// 	EGROUP_PATH_KEYS.ID,
		// 	EGROUP_PATH_KEYS.SIZE_USED,
		// 	EGROUP_PATH_KEYS.SIZE_MAX,
		// ]),
	};

	return <></>;
};

export { BlockCreateGroupContainer };
