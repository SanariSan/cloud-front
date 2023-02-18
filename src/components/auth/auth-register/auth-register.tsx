import { useAtom } from "@dbeining/react-atom";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Image, Input } from "semantic-ui-react";
import logo from "../../../img/logo_alt.png";
import { translateAtom } from "../../../store/translate";
import { changeRoute } from "../../history";
import s from "./auth-register.module.scss";

const AuthRegisterComponent: React.FC<any> = ({ handleRegister, errMessage, setErrMessage }) => {
	const isActive = useRef(true);
	const translated = useAtom(translateAtom);
	const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordRepeat, setPasswordRepeat] = useState<string>("");

	const clearFormAcc = () => {
		if (!isActive.current) return;

		setEmail("");
		setPassword("");
		setPasswordRepeat("");
	};

	const fillWithRandomData = () => {
		if (!isActive.current) return;

		const rndEmailStr = Array.from({ length: Math.floor(Math.random() * (12 - 8) + 8) }, () =>
			String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97)),
		)
			.join("")
			.concat("@gmail.com");

		const rndPasswordStr = Array.from(
			{ length: Math.floor(Math.random() * (18 - 12) + 12) },
			() => String.fromCharCode(Math.floor(Math.random() * (122 - 48) + 48)),
		).join("");

		setEmail(rndEmailStr);
		setPassword(rndPasswordStr);
		setPasswordRepeat(rndPasswordStr);
	};

	const togglePasswordHideState = () => {
		setPasswordHidden((_) => !_);
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
						password === passwordRepeat
							? isActive.current && (await handleRegister(email, password))
							: alert("Passwords do not match each other!");
						isActive.current && clearFormAcc();
					}}
				>
					<Row className={s.rowSideTop}>
						<h1 className={s.h1Styled}>
							{translated ? "Создайте новый аккаунт" : "Create a new account"}
						</h1>
					</Row>
					<Row className={s.rowMiddle}>
						<Row className={s.fieldWrap}>
							<label className={s.labelStyled}>
								{translated ? "Почта" : "Email"}
							</label>
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
							<label className={s.labelStyled}>
								{translated ? "Пароль" : "Password"}
							</label>
							<Input
								value={password}
								onChange={(e) =>
									isActive.current && setPassword(e.currentTarget.value)
								}
								type={passwordHidden ? "password" : "text"}
								className={s.Input}
							>
								<input />
								<span
									className={classNames(
										s.togglePassword,
										passwordHidden ? s.passwordHidden : s.passwordShown,
									)}
									onClick={() => togglePasswordHideState()}
								/>
							</Input>
						</Row>
						<Row className={s.fieldWrap}>
							<label className={s.labelStyled}>
								{translated ? "Повторите пароль" : "Repeat password"}
							</label>
							<Input
								value={passwordRepeat}
								onChange={(e) =>
									isActive.current && setPasswordRepeat(e.currentTarget.value)
								}
								type={passwordHidden ? "password" : "text"}
								className={s.Input}
							>
								<input />
								<span
									className={classNames(
										s.togglePassword,
										passwordHidden ? s.passwordHidden : s.passwordShown,
									)}
									onClick={() => togglePasswordHideState()}
								/>
							</Input>
						</Row>
					</Row>
					<Row className={s.rowSideBot}>
						<Button
							color="violet"
							inverted
							className={s.btnStyled}
							onClick={() => fillWithRandomData()}
							type={"button"}
						>
							{translated
								? "Заполнить случайными данными (демонстрация)"
								: "Fill with random data (showcase)"}
						</Button>
						<Button color="violet" inverted className={s.btnStyled}>
							{translated ? "Создать аккаунт" : "Create Account"}
						</Button>
					</Row>
				</form>
			</Col>
			<p>
				{translated ? "Уже есть аккаунт? " : "Already have an account? "}
				<a className={s.aStyled} onClick={() => changeRoute("/auth/login")}>
					{translated ? "Войти." : "Sign in."}
				</a>
			</p>
			<span className={s.footer}>
				<p>@Storeton</p>
			</span>
		</Container>
	);
};

export { AuthRegisterComponent };
