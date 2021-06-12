import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { NotFound } from "../../components/not-found";
import { PanelNavigation } from "../../components/panel";
import { Test } from "../../components/test";
import { PanelBrowseContainer } from "./panel-browse";
import { PanelPrivelegeContainer } from "./panel-privelege";
import { PanelSearchContainer } from "./panel-search";
import { PanelSettingsContainer } from "./panel-settings";

const PanelContainer: React.FC<RouteComponentProps> = ({ location }) => {
	return (
		<>
			<PanelNavigation />
			<Switch>
				<Route exact path="/panel" component={PanelBrowseContainer} />
				<Route exact path="/panel/browse" component={PanelBrowseContainer} />
				<Route exact path="/panel/search" component={PanelSearchContainer} />
				<Route exact path="/panel/privelege" component={PanelPrivelegeContainer} />
				<Route exact path="/panel/settings" component={PanelSettingsContainer} />
				<Route exact path="/panel/test" component={Test} />
				<Route path="/panel" component={NotFound} />
			</Switch>
		</>
	);
};

export { PanelContainer };
