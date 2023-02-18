import { useAtom } from "@dbeining/react-atom";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Image, Input } from "semantic-ui-react";
import logo from "../../img/logo_alt.png";
import { translateAtom } from "../../store/translate";
import { changeRoute } from "../history";
import s from "./block-create-group.module.scss";

const BlockCreateGroupComponent: React.FC<any> = ({ handleGroupCreate }) => {
	const translated = useAtom(translateAtom);
	const [groupName, setGroupName] = useState<string>("");
	const [groupPassword, setGroupPassword] = useState<string>("");
	const [passwordHidden, setPasswordHidden] = useState<boolean>(true);
	const isActive = useRef(true);

	const clearFormAcc = () => {
		if (!isActive.current) return;

		setGroupName("");
		setGroupPassword("");
	};

	const fillWithRandomData = () => {
		if (!isActive.current) return;

		const rndNameStr = "group_".concat(
			Array.from({ length: Math.floor(Math.random() * (10 - 5) + 5) }, () =>
				String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97)),
			).join(""),
		);

		const rndPasswordStr = Array.from(
			{ length: Math.floor(Math.random() * (18 - 12) + 12) },
			() => String.fromCharCode(Math.floor(Math.random() * (122 - 48) + 48)),
		).join("");

		setGroupName(rndNameStr);
		setGroupPassword(rndPasswordStr);
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
						isActive.current && (await handleGroupCreate(groupName, groupPassword));
						isActive.current && clearFormAcc();
					}}
				>
					<Row className={s.rowSideTop}>
						<h1 className={s.h1Styled}>
							{translated ? "Создайте свою группу" : "Create you group"}
						</h1>
					</Row>
					<Row className={s.rowMiddle}>
						<Row className={s.fieldWrap}>
							<label className={s.labelStyled}>
								{translated ? "Название группы" : "Group name"}
							</label>
							<Input
								value={groupName}
								onChange={(e) =>
									isActive.current && setGroupName(e.currentTarget.value)
								}
								type="text"
								className={s.Input}
							/>
						</Row>
						<Row className={s.fieldWrap}>
							<label className={s.labelStyled}>
								{translated ? "Пароль группы" : "Group password"}
							</label>
							<Input
								value={groupPassword}
								onChange={(e) =>
									isActive.current && setGroupPassword(e.currentTarget.value)
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
							{translated ? "Войти в панель" : "Let me in"}
						</Button>
					</Row>
				</form>
			</Col>

			<span className={s.footer}>
				<p>@Storeton</p>
			</span>
		</Container>
	);
};

export { BlockCreateGroupComponent };
