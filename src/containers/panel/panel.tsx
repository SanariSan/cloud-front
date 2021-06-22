import { useAtom } from "@dbeining/react-atom";
import React, { useEffect, useRef, useState } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { Ref, Sidebar } from "semantic-ui-react";
import { NotFound } from "../../components/not-found";
import { PanelHeaderComponent } from "../../components/panel";
import { ResponseStatus } from "../../helpers/services";
import { reqGroupInfo, reqProfileInfo } from "../../services/get-info";
import { toggleBlockLoader } from "../../store/block-loader";
import { currentGroupInfoAtom, updateCurrentGroupInfo } from "../../store/current-group";
import { forcedRerenderAtom } from "../../store/forced-rerender";
import { updateGroupOwnage } from "../../store/group-ownage";
import { keystoreAtom } from "../../store/keystore";
import { updateProfileInfo } from "../../store/profile-info";
import { updateStorageInfo } from "../../store/storage-info";
import { updateUserGroupsList } from "../../store/user-groups";
import { PanelBrowseContainer } from "./panel-browse";
import { PanelNavigationContainer } from "./panel-navigation";
import { PanelPrivelegeContainer } from "./panel-privelege";
import { PanelSearchContainer } from "./panel-search";
import { PanelSettingsContainer } from "./panel-settings";

// const profileInfo = useAtom(profileInfoAtom);
// const groupOwnage = useAtom(groupOwnageAtom);
// const userGroupsList = useAtom(userGroupsListAtom);
// const storageInfo = useAtom(storageInfoAtom);

const PanelContainer: React.FC<RouteComponentProps> = () => {
	const isActive = useRef(true);

	const [stateSidebar, setStateSidebar] = useState({
		dimmed: false,
		visible: false,
		animation: "overlay",
		direction: "left",
	});
	const { dimmed, visible, animation, direction } = stateSidebar;

	const forcedRerender = useAtom(forcedRerenderAtom);
	const keystore = useAtom(keystoreAtom);
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
			toggleBlockLoader(true);

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
				})
				.finally(() => {
					toggleBlockLoader(false);
				});
		}
	}, [forcedRerender]); //destructured parameter is undefined once!!

	useEffect(() => {
		//groupInfo
		//storageSize
		if (isActive.current && currentGroupInfo) {
			toggleBlockLoader(true);

			reqGroupInfo({ id: currentGroupInfo.id })
				.then(async ({ code, message, data }) => {
					updateStorageInfo(data.storageInfo);
					updateCurrentGroupInfo({
						id: data.groupInfo.id,
						name: data.groupInfo.name,
						groupParticipants: data.groupParticipants,
					});
				})
				.catch((err) => {
					if (err.status === ResponseStatus.BAD_REQUEST) {
						alert(err.message);
					}
				})
				.finally(() => {
					toggleBlockLoader(false);
				});
		}
	}, [forcedRerender]);

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
				<PanelNavigationContainer
					visible={visible}
					animation={animation}
					direction={direction}
					closeSidebar={closeSidebar}
					mainContentRef={mainContentRef}
				/>

				<Ref innerRef={mainContentRef}>
					<Sidebar.Pusher
						dimmed={dimmed}
						style={{
							width: dimmed ? "90%" : "100%",
							height: "100%",
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
							<Route path="/panel" component={NotFound} />
						</Switch>
					</Sidebar.Pusher>
				</Ref>
			</Sidebar.Pushable>
		</>
	);
};

export { PanelContainer };
