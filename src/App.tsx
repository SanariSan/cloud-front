import { useAtom } from "@dbeining/react-atom";
import React from "react";
import { Route, Switch } from "react-router-dom";
import s from "./App.module.scss";
import { NotFound } from "./components/not-found";
import { AuthContainer } from "./containers/auth";
import { BlockCreateGroupContainer } from "./containers/block-create-group";
import { LandingContainer } from "./containers/landing";
import { PanelContainer } from "./containers/panel";
import { keystoreAtom } from "./store/keystore";
import { userGroupsListAtom } from "./store/user-groups";

const App: React.FC = () => {
	const userGroupsList = useAtom(userGroupsListAtom);
	const keystore = useAtom(keystoreAtom);

	return (
		<div className={s.App}>
			<Switch>
				<Route exact path="/" component={LandingContainer} />
				<Route path="/auth" component={AuthContainer} />
				{keystore && keystore.accessToken && keystore.refreshToken && (
					<Route
						path="/panel"
						component={
							userGroupsList && userGroupsList.length
								? PanelContainer
								: BlockCreateGroupContainer
						}
					/>
				)}
				<Route path="/" component={NotFound} />
			</Switch>
		</div>
	);
};

export { App };
