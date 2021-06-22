import { Button, Col, Container, Row } from "react-bootstrap";
import { Input } from "semantic-ui-react";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { EntityComponent } from "../panel-entity";
import s from "./panel-search.module.scss";

const PanelSearchComponent: React.FC<any> = ({
	handleGroupSearch,
	handleGroupJoin,
	groupsFound,
}) => {
	const isActive = useRef(true);
	const [groupName, setGroupName] = useState<string>("");
	const [email, setEmail] = useState<string>("");

    const [selectedGroup, setSelectedGroup] = useState<{
        ownerId; ownerName;
        ownerEmail; groupId; groupName } | null>(
		null,
	);

	let groups = groupsFound.map(({ ownerId,ownerName,
        ownerEmail, groupId, groupName }, idx) => {
		return (
			<EntityComponent
                idx={idx}
                menuOptions={[]}
                onClick={() => setSelectedGroup({ ownerId, ownerName, ownerEmail, groupId, groupName })}
                onContextMenu={() => { }}
                iconName={"folder open"}
                type={"small"}
                entityText={`Group name: ${groupName}`}
                entityTextAlt={`Owner info: ${ownerEmail || "-"}`}
			/>
		);
	});

	return (
		<Container fluid className={classNames(s.fullSize, s.scroll)}>
			<Row className={classNames(s.fullSize, s.settingsBlocksWrap)}>
				<Col xs={13} lg={7} className={classNames(s.settingsBlockLeft)}>
					<form className={s.formStyled}>
						<Row className={s.rowSideTop}>Search for spaces</Row>
						<Row className={s.rowMiddle}>
							<Row className={s.fieldWrap}>
								<Input
									label={"Group name"}
									value={groupName}
									onChange={(event) => {
										setEmail("");
										setGroupName(event.currentTarget.value);
									}}
									className={s.Input}
								/>
							</Row>
							<p style={{ paddingLeft: "15px", fontSize: "0.8rem" }}>OR</p>
							<Row className={s.fieldWrap}>
								<Input
									label={"User email"}
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
							<Button
								active
								className={s.btn}
								onClick={() =>
									isActive.current && handleGroupSearch(groupName, email)
								}
							>
								Search
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
					>
						<Row className={s.rowSideTop}>Results</Row>
						<Row className={s.rowMiddle}>
							<Row className={s.fieldWrap}>
								{groups}
							</Row>
						</Row>
						<Row className={s.rowSideBot}>
							<Button
								active
								className={s.btn}
								onClick={async () => {
									handleGroupJoin(selectedGroup);
								}}
							>
								Join
							</Button>
						</Row>
					</form>
				</Col>
			</Row>
		</Container>
	);
};

export { PanelSearchComponent };
