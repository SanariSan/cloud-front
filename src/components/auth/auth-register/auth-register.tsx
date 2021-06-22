import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Icon, Input, Menu, Image, Button } from "semantic-ui-react";
import s from "./auth-register.module.scss";
import logo from "../../../img/logo_alt.png";
import { changeRoute } from "../../history";

const AuthRegisterComponent: React.FC<any> = ({ handleRegister, errMessage, setErrMessage }) => {
	const isActive = useRef(true);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordRepeat, setPasswordRepeat] = useState<string>("");

	const clearFormAcc = () => {
		if (!isActive.current) return;

		setEmail("");
		setPassword("");
		setPasswordRepeat("");
	};

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);
	return (
		<Container fluid className={classNames(s.fullSize, s.scroll, s.globalWrap)}>
			<Image className={s.imgStyled} src={logo} />
			<Col xs={13} lg={7} className={classNames(s.authBlock)}>
				<form
					className={s.formStyled}
					onSubmit={(e) => {
						e.preventDefault();
						isActive.current && changeRoute("/auth/login");
					}}
				>
					<Row className={s.rowSideTop}>
						<h1 className={s.h1Styled}>Create a new account</h1>
					</Row>
					<Row className={s.rowMiddle}>
						<Row className={s.fieldWrap}>
							<label className={s.labelStyled}>Email</label>
							<Input
								value={email}
								onChange={(e) =>
									isActive.current && setEmail(e.currentTarget.value)
								}
								type="text"
								className={s.Input}
							/>
						</Row>
						<Row className={s.fieldWrap}>
							<label className={s.labelStyled}>Password</label>
							<Input
								value={password}
								onChange={(e) =>
									isActive.current && setPassword(e.currentTarget.value)
								}
								type="password"
								className={s.Input}
							/>
						</Row>
						<Row className={s.fieldWrap}>
							<label className={s.labelStyled}>Repeat password</label>
							<Input
								value={passwordRepeat}
								onChange={(e) =>
									isActive.current && setPasswordRepeat(e.currentTarget.value)
								}
								type="password"
								className={s.Input}
							/>
						</Row>
					</Row>
					<Row className={s.rowSideBot}>
						<Button
							color="violet"
							inverted
							className={s.btnStyled}
							onClick={async () => {
								password === passwordRepeat
									? await handleRegister(email, password)
									: alert("Passwords do not match each other!");
								clearFormAcc();
							}}
						>
							Create Account
						</Button>
					</Row>
				</form>
			</Col>
			<p>
				Already have an account? <a className={s.aStyled}>Sign in.</a>
			</p>
			<span className={s.footer}>
				<p>@Storeton</p>
			</span>
		</Container>
		// <Container>
		// 	<Menu.Item as="a" onClick={() => changeRoute("/panel")}>
		// 		<Icon name="lock" />
		// 		Panel
		// 	</Menu.Item>
		// 	<Menu.Item as="a" onClick={() => changeRoute("/auth/login")}>
		// 		<Icon name="lock" />
		// 		Login
		// 	</Menu.Item>
		// 	<Input
		// 		label={"login"}
		// 		value={login}
		// 		onChange={(event) => setLogin(event.currentTarget.value)}
		// 	/>
		// 	<Input
		// 		label={"password"}
		// 		value={password}
		// 		onChange={(event) => setPassword(event.currentTarget.value)}
		// 	/>
		// 	<Button active onClick={() => handleRegister(login, password)}>
		// 		Register
		// 	</Button>
		// </Container>
	);
};

export { AuthRegisterComponent };
