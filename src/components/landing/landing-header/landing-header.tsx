import React from "react";
import { Container } from "react-bootstrap";
import { Icon, Menu } from "semantic-ui-react";
import { changeRoute } from "../../history";

const LandingHeaderComponent: React.FC = () => {
	return (
		<Container>
			<Menu.Item as="a" onClick={() => changeRoute("/auth")}>
				<Icon name="lock" />
				Auth
			</Menu.Item>
			Landing head
		</Container>
	);
};

export { LandingHeaderComponent };
