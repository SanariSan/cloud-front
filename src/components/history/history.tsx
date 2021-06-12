import { History } from "history";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

let globalHistory: History;

class CatchHistoryObject extends React.Component<RouteComponentProps> {
	constructor(props: any) {
		super(props);
		globalHistory = props.history;
	}

	render() {
		return <>{JSON.stringify(globalHistory.location)}</>;
	}
}

const ReactRouterGlobalHistory = withRouter(CatchHistoryObject);

function changeRoute(route: string) {
	if (!globalHistory) {
		throw new Error("No history Object. You probably forgot to mount ReactRouterGlobalHistory");
	}

	globalHistory.push(route);
}

export { ReactRouterGlobalHistory, changeRoute };
