import { useAtom } from "@dbeining/react-atom";
import React, { useEffect, useRef, useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { Ref, Sidebar } from "semantic-ui-react";
import { NotFound } from "../../components/not-found";
import { PanelHeaderComponent, PanelNavigation } from "../../components/panel";
import { Test } from "../../components/test";
import { reqGroupInfo, reqProfileInfo } from "../../services/get-info";
import { currentGroupInfoAtom } from "../../store/current-group";
import { groupOwnageAtom, updateGroupOwnage } from "../../store/group-ownage";
import { keystoreAtom } from "../../store/keystore";
import { profileInfoAtom, updateProfileInfo } from "../../store/profile-info";
import { storageInfoAtom, updateStorageInfo } from "../../store/storage-info";
import { updateUserGroupsList, userGroupsListAtom } from "../../store/user-groups";
import { PanelBrowseContainer } from "./panel-browse";
import { PanelPrivelegeContainer } from "./panel-privelege";
import { PanelSearchContainer } from "./panel-search";
import { PanelSettingsContainer } from "./panel-settings";

const PanelContainer: React.FC<RouteComponentProps> = () => {
	const isActive = useRef(true);

	const [stateSidebar, setStateSidebar] = useState({
		dimmed: false,
		visible: false,
		animation: "overlay",
		direction: "left",
	});
	const { dimmed, visible, animation, direction } = stateSidebar;

	const keystore = useAtom(keystoreAtom);
	// const profileInfo = useAtom(profileInfoAtom);
	// const groupOwnage = useAtom(groupOwnageAtom);
	// const userGroupsList = useAtom(userGroupsListAtom);
	// const storageInfo = useAtom(storageInfoAtom);
	const currentGroupInfo = useAtom(currentGroupInfoAtom);

	const mainContentRef = useRef(null);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	useEffect(() => {
		//fetch all user info, always when loaded
		//set to hook
		// ----------
		// groupOwnage: { id: 4 } || null
		// groupsList: [{ id: 4; name: "test2" }] || []
		// storageInfo: { sizeUsed: 0, sizeMax: 15000 } || null
		// ​user: { id: 4, name: null, email: "e@mail.ru", profilePicUrl: null }
		if (isActive.current) {
			reqProfileInfo()
				.then(async ({ code, message, data }) => {
					console.log(data);
					await updateProfileInfo(data.user);
					await updateUserGroupsList(data.groupsList);

					if (data.groupOwnage) {
						await updateGroupOwnage(data.groupOwnage);
					}
				})
				.catch(({ code, message, status }) => {
					console.warn(message);
				});
		}
	}, [keystore]); //destructured parameter is undefined once!!

	useEffect(() => {
		//groupInfo
		//storageSize
		if (isActive.current) {
			if (currentGroupInfo)
				reqGroupInfo({ id: currentGroupInfo.id })
					.then(async ({ code, message, data }) => {
						console.log(data);
						await updateStorageInfo(data.storageInfo);
					})
					.catch((err) => {
						console.error(err);
					});
		}
	}, [currentGroupInfo]);

	const closeSidebar = async () => {
		if (isActive.current && stateSidebar.dimmed && stateSidebar.visible) {
			await setStateSidebar((oldState) => ({
				...oldState,
				dimmed: false,
				visible: false,
			}));
		}
	};

	const toggleSidebar = async () => {
		if (isActive.current) {
			await setStateSidebar((oldState) => ({
				...oldState,
				dimmed: !oldState.dimmed,
				visible: !oldState.visible,
			}));
		}
	};

	return (
		<>
			<PanelHeaderComponent toggleSidebar={toggleSidebar} />
			<Sidebar.Pushable
				style={{
					overflow: "visible",
					height: "calc(100% - 65px)",
				}}
			>
				<PanelNavigation
					visible={visible}
					animation={animation}
					direction={direction}
					closeSidebar={closeSidebar}
					mainContentRef={mainContentRef}
				/>
				{/*later try moving up, wrapping all in ref*/}
				<Ref innerRef={mainContentRef}>
					<Sidebar.Pusher
						dimmed={dimmed}
						style={{
							width: dimmed ? "90%" : "100%",
							float: "right",
							transition: "width 0.5s",
						}}
					>
						<Switch>
							<Route exact path="/panel" component={PanelBrowseContainer} />
							<Route exact path="/panel/browse" component={PanelBrowseContainer} />
							<Route exact path="/panel/search" component={PanelSearchContainer} />
							<Route
								exact
								path="/panel/privelege"
								component={PanelPrivelegeContainer}
							/>
							<Route
								exact
								path="/panel/settings"
								component={PanelSettingsContainer}
							/>
							<Route exact path="/panel/test" component={Test} />
							<Route path="/panel" component={NotFound} />
						</Switch>
					</Sidebar.Pusher>
				</Ref>
			</Sidebar.Pushable>
		</>
	);
};

export { PanelContainer };
