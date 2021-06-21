import { useAtom } from "@dbeining/react-atom";
import React, { useEffect, useRef } from "react";
import { BlockCreateGroupComponent } from "../../components/block-create-group";
import { changeRoute } from "../../components/history";
import { reqProfileInfo } from "../../services/get-info";
import { reqGroupCreate } from "../../services/group";
import { updateGroupOwnage } from "../../store/group-ownage";
import { keystoreAtom } from "../../store/keystore";
import { updateProfileInfo } from "../../store/profile-info";
import { updateUserGroupsList, userGroupsListAtom } from "../../store/user-groups";

const BlockCreateGroupContainer: React.FC<any> = () => {
	const isActive = useRef(true);
	const keystore = useAtom(keystoreAtom);
	const userGroupsList = useAtom(userGroupsListAtom);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	useEffect(() => {
		if (isActive.current) {
			reqProfileInfo()
				.then(async ({ data }) => {
					await updateProfileInfo(data.user);
					await updateUserGroupsList(data.groupsList);

					if (data.groupOwnage) {
						await updateGroupOwnage(data.groupOwnage);
					}
				})
				.catch((err) => {});
		}
	}, []);

	const handleGroupCreate = (name, password) => {
		// group: {id, name},
		// size: {sizeUsed, sizeMax}

		reqGroupCreate({ groupName: name, password })
			.then(async ({ code, message, data }) => {
				console.log(data);
				await updateUserGroupsList([...userGroupsList, data.group]);
			})
			.then(() => changeRoute("/panel/browse"))
			.catch((err) => {
				console.warn(err);
			});
	};

	return <BlockCreateGroupComponent handleGroupCreate={handleGroupCreate} />;
};

export { BlockCreateGroupContainer };