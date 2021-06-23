import { useAtom } from "@dbeining/react-atom";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Image, Input } from "semantic-ui-react";
import logo from "../../../img/logo_alt.png";
import { translateAtom } from "../../../store/translate";
import { changeRoute } from "../../history";
import s from "./auth-login.module.scss";

const AuthLoginComponent: React.FC<any> = ({ handleLogin, errMessage, setErrMessage }) => {
	const isActive = useRef(true);
	const translated = useAtom(translateAtom);
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
			<Image
				className={s.imgStyled}
				src={logo}
				onClick={() => isActive.current && changeRoute("/")}
			/>
			<Col xs={13} lg={7} className={classNames(s.authBlock)}>
				<form
					className={s.formStyled}
					onSubmit={async (e) => {
						e.preventDefault();
						isActive.current && (await handleLogin(email, password));
						isActive.current && clearFormAcc();
					}}
				>
					<Row className={s.rowSideTop}>
						<h1 className={s.h1Styled}>
							{translated ? "Войдите в свой аккаунт" : "Sign in to your account"}
						</h1>
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
						<Button color="violet" inverted className={s.btnStyled}>
							{translated ? "Войти" : "Login"}
						</Button>
					</Row>
				</form>
			</Col>
			<p>
				{translated ? "Еще нет аккаунта?" : "Don't have an account? "}
				<a className={s.aStyled} onClick={() => changeRoute("/auth/register")}>
					{translated ? "Зарегистрироваться" : "Sign up."}
				</a>
			</p>
			<span className={s.footer}>
				<p>@Storeton</p>
			</span>
		</Container>
	);
};

export { AuthLoginComponent };
