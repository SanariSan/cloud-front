import React from "react";
import { Container } from "react-bootstrap";
import { Icon, Menu } from "semantic-ui-react";
import { changeRoute } from "../../history";

const AuthLoginComponent: React.FC = () => {
	return (
		<Container>
			<Menu.Item as="a" onClick={() => changeRoute("/panel")}>
				<Icon name="lock" />
				Panel
			</Menu.Item>
			Login
		</Container>
	);
};

export { AuthLoginComponent };
