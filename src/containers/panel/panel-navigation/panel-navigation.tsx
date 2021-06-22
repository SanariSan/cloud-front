import { useAtom } from "@dbeining/react-atom";
import React, { SyntheticEvent, useEffect, useRef } from "react";
import { DropdownProps, Sidebar } from "semantic-ui-react";
import { PanelNavigationComponent } from "../../../components/panel";
import { ResponseStatus } from "../../../helpers/services";
import { reqFsCreate, reqFsUpload } from "../../../services/fs";
import { reqGroupInfo } from "../../../services/get-info";
import { toggleBlockLoader } from "../../../store/block-loader";
import { currentGroupInfoAtom, updateCurrentGroupInfo } from "../../../store/current-group";
import { forceRerender } from "../../../store/forced-rerender";
import { groupOwnageAtom } from "../../../store/group-ownage";
import { pathAtom } from "../../../store/path";
import { storageInfoAtom } from "../../../store/storage-info";
import { userGroupsListAtom } from "../../../store/user-groups";

const PanelNavigationContainer: React.FC<any> = ({
	visible,
	direction,
	animation,
	closeSidebar,
	mainContentRef,
}) => {
	const isActive = useRef(true);
	const groupOwnage = useAtom(groupOwnageAtom);
	const userGroupsList = useAtom(userGroupsListAtom);
	const storageInfo = useAtom(storageInfoAtom);
	const currentGroupInfo = useAtom(currentGroupInfoAtom);
	const path = useAtom(pathAtom);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	// console.log("Current path: ", path);

	//userGroupsInfo = [{id, name},...]
	let selectGroupOptions: any = [];
	if (userGroupsList)
		selectGroupOptions = userGroupsList.map((el) => ({
			key: el.id,
			text: el.name,
			value: el.id,
		}));

	const handleChange = async (
		event: SyntheticEvent<HTMLElement, Event>,
		{ value }: DropdownProps,
	) => {
		const chosenGroup = userGroupsList.filter((el) => el.id === value);

		if (isActive.current && chosenGroup && chosenGroup.length !== 0) {
			toggleBlockLoader(true);

			const res = await reqGroupInfo({ id: chosenGroup[0].id }).catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			});

			toggleBlockLoader(false);

			if (!res || !res.data || !isActive.current) return;

			updateCurrentGroupInfo({
				id: res.data.groupInfo.id,
				name: res.data.groupInfo.name,
				groupParticipants: res.data.groupParticipants,
			});

			forceRerender();
		}
	};

	const handleUpload = (event) => {
		if (!currentGroupInfo || !event.currentTarget.files.length) {
			return;
		}

		const file = event.currentTarget.files[0];

		toggleBlockLoader(true);

		reqFsUpload({ groupId: currentGroupInfo.id, path, filename: file.name, data: file })
			.then(forceRerender)
			.catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	const handleCreateFolder = () => {
		if (!currentGroupInfo) {
			return;
		}

		const filename = prompt("Enter folder name");

		if (!filename) {
			return;
		}

		toggleBlockLoader(true);

		reqFsCreate({ groupId: currentGroupInfo.id, path, filename })
			.then(forceRerender)
			.catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			})
			.finally(() => {
				toggleBlockLoader(false);
			});
	};

	return (
		<Sidebar
			visible={visible}
			direction={direction}
			animation={animation}
			onHide={closeSidebar}
			target={mainContentRef}
		>
			<PanelNavigationComponent
				storageInfo={storageInfo}
				groupOwnage={groupOwnage}
				currentGroupInfo={currentGroupInfo}
				selectGroupOptions={selectGroupOptions}
				handleChange={handleChange}
				handleUpload={handleUpload}
				handleCreateFolder={handleCreateFolder}
			/>
		</Sidebar>
	);
};

export { PanelNavigationContainer };
