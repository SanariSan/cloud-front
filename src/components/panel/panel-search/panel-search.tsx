import { Col, Container, Row } from "react-bootstrap";
import { Input, Button } from "semantic-ui-react";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import { EntityComponent } from "../panel-entity";
import s from "./panel-search.module.scss";
import { translateAtom } from "../../../store/translate";
import { useAtom } from "@dbeining/react-atom";

const PanelSearchComponent: React.FC<any> = ({
	handleGroupSearch,
	handleGroupJoin,
	groupsFound,
}) => {
	const isActive = useRef(true);
	const translated = useAtom(translateAtom);
	const [groupName, setGroupName] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	const [selectedGroup, setSelectedGroup] = useState<{
		ownerId;
		ownerName;
		ownerEmail;
		groupId;
		groupName;
	} | null>(null);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	let groups = groupsFound.map(({ ownerId, ownerName, ownerEmail, groupId, groupName }, idx) => {
		return (
			<EntityComponent
				idx={idx}
				menuOptions={[]}
				onClick={() =>
					setSelectedGroup({ ownerId, ownerName, ownerEmail, groupId, groupName })
				}
				onContextMenu={() => {}}
				iconName={"folder open"}
				type={"small"}
				entityText={`${translated ? "Имя группы" : "Group name"}: ${groupName}`}
				entityTextAlt={`${translated ? "Владелец" : "Owner info"}: ${ownerEmail || "-"}`}
				selected={selectedGroup && selectedGroup.groupId === groupId ? true : false}
			/>
		);
	});

	return (
		<Container fluid className={classNames(s.fullSize, s.scroll)}>
			<Row className={classNames(s.fullSize, s.settingsBlocksWrap)}>
				<Col xs={13} lg={7} className={classNames(s.settingsBlockLeft)}>
					<form
						className={s.formStyled}
						onSubmit={async (e) => {
							e.preventDefault();

							isActive.current &&
								(groupName || email) &&
								handleGroupSearch(groupName, email);
						}}
					>
						<Row className={s.rowSideTop}>
							{translated ? "Поиск групп" : "Search for spaces"}
						</Row>
						<Row className={s.rowMiddle}>
							<Row className={s.fieldWrap}>
								<Input
									label={translated ? "Название группы" : "Group name"}
									value={groupName}
									onChange={(event) => {
										setEmail("");
										setGroupName(event.currentTarget.value);
									}}
									className={s.Input}
								/>
							</Row>
							<p style={{ paddingLeft: "15px", fontSize: "0.8rem" }}>
								{translated ? "ИЛИ" : "OR"}
							</p>
							<Row className={s.fieldWrap}>
								<Input
									label={translated ? "Почта владельца" : "User email"}
									value={email}
									onChange={(event) => {
										setGroupName("");
										setEmail(event.currentTarget.value);
									}}
									className={s.Input}
								/>
							</Row>
						</Row>
						<Row className={s.rowSideBot}>
							<Button color="violet" inverted className={s.btn}>
								{translated ? "Поиск" : "Search"}
							</Button>
						</Row>
					</form>
				</Col>

				<Col xs={13} lg={7} className={classNames(s.settingsBlockRight)}>
					<form
						style={{
							width: "100%",
							height: "100%",
							overflow: "hidden",
							paddingLeft: "10px",
							paddingRight: "10px",
						}}
						onSubmit={async (e) => {
							e.preventDefault();
							isActive.current && selectedGroup && handleGroupJoin(selectedGroup);
						}}
					>
						<Row className={s.rowSideTop}>{translated ? "Результаты" : "Results"}</Row>
						<Row className={classNames(s.rowMiddle, s.scroll)}>
							<Row className={s.fieldWrap}>{groups}</Row>
						</Row>
						<Row className={s.rowSideBot}>
							<Button color="violet" inverted className={s.btn}>
								{translated ? "Вступить" : "Join"}
							</Button>
						</Row>
					</form>
				</Col>
			</Row>
		</Container>
	);
};

export { PanelSearchComponent };
