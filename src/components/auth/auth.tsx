import React from "react";
import { Container } from "react-bootstrap";
import { AuthLoginComponent } from "./auth-login";
import { AuthRegisterComponent } from "./auth-register";

const AuthComponent: React.FC = () => {
	return (
		<Container>
			Auth components
			<AuthLoginComponent />
			<AuthRegisterComponent />
		</Container>
	);
};

export { AuthComponent };
