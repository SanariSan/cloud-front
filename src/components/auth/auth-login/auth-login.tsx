import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Icon, Input, Menu } from "semantic-ui-react";
import { changeRoute } from "../../history";

const AuthLoginComponent: React.FC<any> = ({ handleLogin, errMessage, setErrMessage }) => {
	const [login, setLogin] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<Container>
			<Menu.Item as="a" onClick={() => changeRoute("/panel")}>
				<Icon name="lock" />
				Panel
			</Menu.Item>
			<Menu.Item as="a" onClick={() => changeRoute("/auth/register")}>
				<Icon name="lock" />
				Register
			</Menu.Item>
			<Input
				label={"login"}
				value={login}
				onChange={(event) => setLogin(event.currentTarget.value)}
			/>
			<Input
				label={"password"}
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
			/>
			<Button active onClick={() => handleLogin(login, password)}>
				Login
			</Button>
		</Container>
	);
};

export { AuthLoginComponent };
