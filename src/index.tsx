import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, Switch } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { App } from "./App";
import { ReactRouterGlobalHistory } from "./components/history";
import "./index.scss";

const history = createBrowserHistory();

ReactDOM.render(
	<React.StrictMode>
		<Router history={history}>
			<ReactRouterGlobalHistory />
			<Switch>
				<Route path="/" component={App} />
			</Switch>
		</Router>
	</React.StrictMode>,

	document.getElementById("root"),
);
