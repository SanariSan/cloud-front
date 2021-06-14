import React, { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { Ref, Sidebar } from "semantic-ui-react";
import { NotFound } from "../../components/not-found";
import { PanelHeaderComponent, PanelNavigation } from "../../components/panel";
import { Test } from "../../components/test";
import { PanelBrowseContainer } from "./panel-browse";
import { PanelPrivelegeContainer } from "./panel-privelege";
import { PanelSearchContainer } from "./panel-search";
import { PanelSettingsContainer } from "./panel-settings";
import s from "./panel.module.scss";

const PanelContainer: React.FC<RouteComponentProps> = () => {
	const [stateSidebar, setStateSidebar] = useState({
		dimmed: false,
		visible: false,
	});
	const mainContentRef = useRef(null);

	const { dimmed, visible } = stateSidebar;
	const animation = "overlay";
	const direction = "left";

	const closeSidebar = async () => {
		if (stateSidebar.dimmed && stateSidebar.visible) {
			await setStateSidebar((oldState) => ({
				...oldState,
				dimmed: false,
				visible: false,
			}));
		}
	};

	const toggleSidebar = async () => {
		await setStateSidebar((oldState) => ({
			...oldState,
			dimmed: !oldState.dimmed,
			visible: !oldState.visible,
		}));
	};

	console.log(stateSidebar);

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
