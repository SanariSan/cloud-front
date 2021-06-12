import React from "react";
import { Route, Switch } from "react-router-dom";
import { NotFound } from "./components/not-found";
import { LandingContainer, PanelContainer } from "./containers";

const App: React.FC = () => {
	return (
		<div className="App">
			<Switch>
				<Route path="/panel" component={PanelContainer} />
				<Route exact path="/" component={LandingContainer} />
				<Route path="/" component={NotFound} />
			</Switch>
		</div>
	);
};

export { App };
