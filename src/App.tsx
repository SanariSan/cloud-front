import React from "react";
import { Route, Switch } from "react-router-dom";
import s from "./App.module.scss";
import { NotFound } from "./components/not-found";
import { AuthContainer } from "./containers/auth";
import { LandingContainer } from "./containers/landing";
import { PanelContainer } from "./containers/panel";
import { useLocalStorage } from "./hooks";

const App: React.FC = () => {
	const [userGroupsInfo, setUserGroupsInfo] = useLocalStorage("userGroupsInfo", []);

	return (
		<div className={s.App}>
			<Switch>
				<Route exact path="/" component={LandingContainer} />
				<Route path="/auth" component={AuthContainer} />
				<Route
					path="/panel"
					component={userGroupsInfo.length ? PanelContainer : BlockCreateGroupContainer}
				/>
				<Route path="/" component={NotFound} />
			</Switch>
		</div>
	);
};

export { App };
