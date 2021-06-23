import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Dropdown, Icon, Menu } from "semantic-ui-react";
import { updatePath } from "../../../store/path";
import { EntityComponent } from "../panel-entity";
import s from "./panel-browse.module.scss";
import { translateAtom } from "../../../store/translate";
import { useAtom } from "@dbeining/react-atom";

const PanelBrowseFilesComponent: React.FC<any> = ({
	currentPathContent,
	currentGroupInfo,
	onClickFolder,
	onClickFile,
	onContextMenu,
	path,
	handleDownload,
	handleRenameFile,
	handleRenameFolder,
	handleDeteleFile,
	handleDeteleFolder,
	handleGroupKick,
}) => {
	const isActive = useRef(true);
	const translated = useAtom(translateAtom);

	const menuOptionsFolder = (idx) => [
		{
			text: "rename",
			action: () => handleRenameFolder(idx),
		},
		{
			text: "delete",
			action: () => handleDeteleFolder(idx),
		},
	];

	const menuOptionsFile = (idx) => [
		{
			text: "download",
			action: () => handleDownload(idx),
		},
		{
			text: "rename",
			action: () => handleRenameFile(idx),
		},
		{
			text: "delete",
			action: () => handleDeteleFile(idx),
		},
	];

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	let folders = currentPathContent.folders.map((el, idx) => {
		return (
			<EntityComponent
				idx={idx}
				menuOptions={menuOptionsFolder(idx)}
				onClick={(event) => onClickFolder(event, el)}
				onContextMenu={onContextMenu}
				iconName={"folder open"}
				type={"big"}
				entityText={el}
			/>
		);
	});

	let files = currentPathContent.files.map((el, idx) => {
		return (
			<EntityComponent
				idx={idx}
				menuOptions={menuOptionsFile(idx)}
				onClick={(event) => onClickFile(event, el)}
				onContextMenu={onContextMenu}
				iconName={"file"}
				type={"big"}
				entityText={el}
			/>
		);
	});

	let parsedPathObj: { path; btnText }[] = [];
	let lastMatch = 0;

	for (let i = 0; i < path.length; i++) {
		if (path[i] === "/") {
			parsedPathObj.push({
				path: i === 0 ? "/" : path.slice(0, i),
				btnText: i === 0 ? "/home" : path.slice(lastMatch, i),
			});
			lastMatch = i;
		}
	}

	parsedPathObj.push({
		path: path.slice(0),
		btnText: path.slice(lastMatch),
	});

	let pathTrackerButtons = parsedPathObj.map((el, idx) => (
		<>
			<Button
				basic
				color="grey"
				onClick={() => {
					updatePath(`${parsedPathObj[idx].path}`);
				}}
			>
				{parsedPathObj[idx].btnText}
			</Button>
			{">"}
		</>
	));

	return (
		<Container fluid className={s.containerStyled}>
			<Row className={s.rowTopStyled}>
				<Col xs={16}>
					<h1 style={{ paddingLeft: "5px" }}>
						{translated ? "Файловый менеджер" : "File Manager"}
					</h1>
				</Col>
			</Row>
			<hr className={s.hrStyled} />
			<Row className={s.rowTopStyled}>
				<Col xs={16}>
					<div className={s.divNavStyled}>
						<Col>
							<p>{pathTrackerButtons}</p>
						</Col>
						<Col
							xs={2}
							style={{ display: "flex", justifyContent: "end", marginRight: "10px" }}
						>
							<Menu icon vertical>
								<Dropdown direction="left" pointing="left" item placeholder={"👥"}>
									<Dropdown.Menu>
										{currentGroupInfo.groupParticipants.map((el) => (
											<Dropdown.Item onClick={() => handleGroupKick(el)}>
												<Icon name="trash" />
												{el.name || el.email}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
							</Menu>
						</Col>
					</div>
				</Col>
			</Row>
			<hr className={s.hrStyled} />
			<Row className={s.rowBotStyled}>
				{folders}
				{files}
			</Row>
		</Container>
	);
};

export { PanelBrowseFilesComponent };
