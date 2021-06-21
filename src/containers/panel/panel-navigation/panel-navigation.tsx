import { useAtom } from "@dbeining/react-atom";
import React, { SyntheticEvent, useEffect, useRef } from "react";
import { DropdownProps, Sidebar } from "semantic-ui-react";
import { currentGroupInfoAtom, updateCurrentGroupInfo } from "../../../store/current-group";
import { groupOwnageAtom } from "../../../store/group-ownage";
import { storageInfoAtom } from "../../../store/storage-info";
import { userGroupsListAtom } from "../../../store/user-groups";
import { PanelNavigationComponent } from "../../../components/panel";
import { pathAtom } from "../../../store/path";
import { reqFsCreate, reqFsUpload } from "../../../services/fs";
import { forceRerender } from "../../../store/forced-rerender";

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

	const handleChange = (event: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps) => {
		const chosenGroup = userGroupsList.filter((el) => el.id === value);
		if (chosenGroup && chosenGroup.length !== 0) {
			updateCurrentGroupInfo({
				id: chosenGroup[0].id,
				name: chosenGroup[0].name,
			});
		}
	};

	const handleUpload = (event) => {
		const file = event.currentTarget.files[0];
		// const data = new FormData();

		// data.append("file", file);
		reqFsUpload({ groupId: currentGroupInfo.id, path, filename: file.name, data: file })
			.then(forceRerender)
			.catch();
	};

	const handleCreateFolder = () => {
		const filename = prompt("Enter folder name");

		if (filename) {
			reqFsCreate({ groupId: currentGroupInfo.id, path, filename })
				.then(forceRerender)
				.catch();
		}
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
