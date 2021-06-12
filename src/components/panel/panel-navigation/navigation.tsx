import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { changeRoute } from "../../history";

const PanelNavigation: React.FC<any> = () => {
	return (
		//this should be pusher
		<div>
			<Menu.Item as="a" onClick={() => changeRoute("/panel/browse")}>
				<Icon name="file" />
				Browse
			</Menu.Item>
			<Menu.Item as="a" onClick={() => changeRoute("/panel/search")}>
				<Icon name="search" />
				Search
			</Menu.Item>
			<Menu.Item as="a" onClick={() => changeRoute("/panel/privelege")}>
				<Icon name="money" />
				Privelege
			</Menu.Item>
			<Menu.Item as="a" onClick={() => changeRoute("/panel/settings")}>
				<Icon name="settings" />
				Settings
			</Menu.Item>
			<Menu.Item as="a" onClick={() => changeRoute("/panel/test")}>
				<Icon name="home" />
				Test
			</Menu.Item>
		</div>
	);
};

export { PanelNavigation };
