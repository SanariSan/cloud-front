import { useAtom } from "@dbeining/react-atom";
import React from "react";
import { Route, Switch } from "react-router-dom";
import s from "./App.module.scss";
import { NotFound } from "./components/not-found";
import { BlockLoaderComponent } from "./components/block-loader";
import { AuthContainer } from "./containers/auth";
import { BlockCreateGroupContainer } from "./containers/block-create-group";
import { LandingContainer } from "./containers/landing";
import { PanelContainer } from "./containers/panel";
import { blockLoaderAtom, toggleBlockLoader } from "./store/block-loader";
import { keystoreAtom } from "./store/keystore";
import { userGroupsListAtom } from "./store/user-groups";

let blockLoaderDisabler: any = false;

const disabler = () => {
	toggleBlockLoader(false);
	blockLoaderDisabler = setTimeout(disabler, 20000);
};

const App: React.FC = () => {
	const userGroupsList = useAtom(userGroupsListAtom);
	const keystore = useAtom(keystoreAtom);
	const blockLoader = useAtom(blockLoaderAtom);

	if (!blockLoaderDisabler) setTimeout(disabler, 20000);

	return (
		<div className={s.App}>
			{blockLoader ? <BlockLoaderComponent /> : null}
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
