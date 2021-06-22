import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Icon, Input, Menu, Image, Button } from "semantic-ui-react";
import { changeRoute } from "../../history";
import s from "./auth-login.module.scss";
import logo from "../../../img/logo_alt.png";

const AuthLoginComponent: React.FC<any> = ({ handleLogin, errMessage, setErrMessage }) => {
	const isActive = useRef(true);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const clearFormAcc = () => {
		if (!isActive.current) return;

		setEmail("");
		setPassword("");
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
						isActive.current && changeRoute("/auth/register");
					}}
				>
					<Row className={s.rowSideTop}>
						<h1 className={s.h1Styled}>Sign in to your account</h1>
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
					</Row>
					<Row className={s.rowSideBot}>
						<Button
							color="violet"
							inverted
							className={s.btnStyled}
							onClick={async () => {
								await handleLogin(email, password);
								clearFormAcc();
							}}
						>
							Login
						</Button>
					</Row>
				</form>
			</Col>
			<p>
				Don't have an account? <a className={s.aStyled}>Sign up.</a>
			</p>
			<span className={s.footer}>
				<p>@Storeton</p>
			</span>
		</Container>
	);
};

export { AuthLoginComponent };
