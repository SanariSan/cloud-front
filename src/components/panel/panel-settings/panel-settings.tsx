import { useAtom } from "@dbeining/react-atom";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input } from "semantic-ui-react";
import { translateAtom } from "../../../store/translate";
import s from "./panel-settings.module.scss";

const PanelSettingsComponent: React.FC<any> = ({
	handleChnagePasswordAcc,
	handleChnagePasswordGroup,
}) => {
	const isActive = useRef(true);
	const translated = useAtom(translateAtom);

	const [oldPassAcc, setOldPassAcc] = useState<string>("");
	const [newPassAcc, setNewPassAcc] = useState<string>("");
	const [newPassAccRepeat, setNewPassAccRepeat] = useState<string>("");

	const [oldPassGroup, setOldPassGroup] = useState<string>("");
	const [newPassGroup, setNewPassGroup] = useState<string>("");
	const [newPassGroupRepeat, setNewPassGroupRepeat] = useState<string>("");

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	const clearFormAcc = () => {
		if (!isActive.current) return;

		setOldPassAcc("");
		setNewPassAcc("");
		setNewPassAccRepeat("");
	};

	const clearFormGroup = () => {
		if (!isActive.current) return;

		setOldPassGroup("");
		setNewPassGroup("");
		setNewPassGroupRepeat("");
	};

	return (
		<Container fluid className={classNames(s.fullSize, s.scroll)}>
			<Row className={classNames(s.fullSize, s.settingsBlocksWrap)}>
				<Col xs={13} lg={7} className={classNames(s.settingsBlock)}>
					<form
						className={s.formStyled}
						onSubmit={async (e) => {
							e.preventDefault();

							newPassAcc === newPassAccRepeat
								? isActive.current &&
								  (await handleChnagePasswordAcc(oldPassAcc, newPassAcc))
								: alert("Passwords do not match each other!");
							isActive.current && clearFormAcc();
						}}
					>
						<Row className={s.rowSideTop}>
							{translated ? "Изменить пароль аккаунта" : "Change Account Password"}
						</Row>
						<Row className={s.rowMiddle}>
							<Row className={s.fieldWrap}>
								<Input
									label={"Old password"}
									value={oldPassAcc}
									onChange={(e) =>
										isActive.current && setOldPassAcc(e.currentTarget.value)
									}
									type="password"
									className={s.Input}
								/>
							</Row>
							<Row className={s.fieldWrap}>
								<Input
									label={"New password"}
									value={newPassAcc}
									onChange={(e) =>
										isActive.current && setNewPassAcc(e.currentTarget.value)
									}
									type="password"
									className={s.Input}
								/>
							</Row>
							<Row className={s.fieldWrap}>
								<Input
									label={"Repeat password"}
									value={newPassAccRepeat}
									onChange={(e) =>
										isActive.current &&
										setNewPassAccRepeat(e.currentTarget.value)
									}
									type="password"
									className={s.Input}
								/>
							</Row>
						</Row>
						<Row className={s.rowSideBot}>
							<Button color="violet" inverted className={s.btn}>
								Change
							</Button>
						</Row>
					</form>
				</Col>
				<Col xs={13} lg={7} className={classNames(s.settingsBlock)}>
					<form
						className={s.formStyled}
						onSubmit={async (e) => {
							e.preventDefault();

							newPassGroup === newPassGroupRepeat
								? isActive.current &&
								  (await handleChnagePasswordGroup(oldPassGroup, newPassGroup))
								: alert("Passwords do not match each other!");
							isActive.current && clearFormGroup();
						}}
					>
						<Row className={s.rowSideTop}>
							{translated ? "Изменить пароль группы" : "Change Group Password"}
						</Row>
						<Row className={s.rowMiddle}>
							<Row className={s.fieldWrap}>
								<Input
									label={"Old password"}
									value={oldPassGroup}
									onChange={(e) =>
										isActive.current && setOldPassGroup(e.currentTarget.value)
									}
									type="password"
									className={s.Input}
								/>
							</Row>
							<Row className={s.fieldWrap}>
								<Input
									label={"New password"}
									value={newPassGroup}
									onChange={(e) =>
										isActive.current && setNewPassGroup(e.currentTarget.value)
									}
									type="password"
									className={s.Input}
								/>
							</Row>
							<Row className={s.fieldWrap}>
								<Input
									label={"Repeat password"}
									value={newPassGroupRepeat}
									onChange={(e) =>
										isActive.current &&
										setNewPassGroupRepeat(e.currentTarget.value)
									}
									type="password"
									className={s.Input}
								/>
							</Row>
						</Row>
						<Row className={s.rowSideBot}>
							<Button color="violet" inverted className={s.btn}>
								Change
							</Button>
						</Row>
					</form>
				</Col>
			</Row>
		</Container>
	);
};

export { PanelSettingsComponent };
