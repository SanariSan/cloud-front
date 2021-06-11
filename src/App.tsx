import React from "react";
import { Route, Switch } from "react-router-dom";
import { Footer, Intro } from "./components/blocks";
import { Header } from "./components/header";

const App: React.FC = () => {
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route exact path="/" component={Intro} />
				<Route exact path="/test" component={Footer} />
			</Switch>
		</div>
	);
};

export { App };
