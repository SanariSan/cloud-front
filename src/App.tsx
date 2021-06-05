import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";
import { Intro } from "./components";

const App: React.FC = () => {
	return (
		<div className="App">
			<Intro />
		</div>
	);
};

export { App };
