import classNames from "classnames";
import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Input } from "semantic-ui-react";
import { Col, Container, Row } from "react-bootstrap";
import s from "./panel-settings.module.scss";

const PanelSettingsComponent: React.FC<any> = ({
	handleChnagePasswordAcc,
	handleChnagePasswordGroup,
}) => {
	const isActive = useRef(true);

	const [oldPassAcc, setOldPassAcc] = useState<string>("");
	const [newPassAcc, setNewPassAcc] = useState<string>("");
	const [newPassAccRepeat, setNewPassAccRepeat] = useState<string>("");

	const [oldPassGroup, setOldPassGroup] = useState<string>("");
	const [newPassGroup, setNewPassGroup] = useState<string>("");
	const [newPassGroupRepeat, setNewPassGroupRepeat] = useState<string>("");

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
					<form className={s.formStyled}>
						<Row className={s.rowSideTop}>Change Account Password</Row>
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
							<Button
								active
								className={s.btn}
								onClick={async () => {
									newPassAcc === newPassAccRepeat
										? await handleChnagePasswordAcc(oldPassAcc, newPassAcc)
										: alert("Passwords do not match each other!");
									clearFormAcc();
								}}
							>
								Change
							</Button>
						</Row>
					</form>
				</Col>
				<Col xs={13} lg={7} className={classNames(s.settingsBlock)}>
					<form
						style={{
							width: "100%",
							height: "100%",
							overflow: "hidden",
							paddingLeft: "10px",
							paddingRight: "10px",
						}}
					>
						<Row className={s.rowSideTop}>Change Group Password</Row>
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
							<Button
								active
								className={s.btn}
								onClick={async () => {
									newPassGroup === newPassGroupRepeat
										? await handleChnagePasswordGroup(
												oldPassGroup,
												newPassGroup,
										  )
										: alert("Passwords do not match each other!");
									clearFormGroup();
								}}
							>
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
