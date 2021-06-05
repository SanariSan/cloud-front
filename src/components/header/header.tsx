import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { changeRoute } from "../history";

const Header: React.FC<any> = () => {
	return (
		<div>
			<Menu.Item as="a" onClick={() => changeRoute("/")}>
				<Icon name="home" />
				Home
			</Menu.Item>
			<Menu.Item as="a" onClick={() => changeRoute("/test")}>
				<Icon name="gamepad" />
				Test
			</Menu.Item>
		</div>
	);
};

export { Header };
