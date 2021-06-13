import React from "react";
import { Container } from "react-bootstrap";
import { Icon, Menu } from "semantic-ui-react";
import { changeRoute } from "../../history";

const AuthRegisterComponent: React.FC = () => {
	return (
		<Container>
			<Menu.Item as="a" onClick={() => changeRoute("/panel")}>
				<Icon name="lock" />
				Panel
			</Menu.Item>
			Register
		</Container>
	);
};

export { AuthRegisterComponent };
