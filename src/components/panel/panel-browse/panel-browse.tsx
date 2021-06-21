import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-contexify/dist/ReactContexify.css";
import { Button } from "semantic-ui-react";
import { updatePath } from "../../../store/path";
import { EntityComponent } from "../panel-entity";
import s from "./panel-browse.module.scss";

const PanelBrowseFilesComponent: React.FC<any> = ({
	currentPathContent,
	onClickFolder,
	onClickFile,
	onContextMenu,
	path,
	handleDownload,
}) => {
	const isActive = useRef(true);

	const menuOptionsFolder = (idx) => [
		{
			text: "rename",
			action: (idx) => alert("test"),
		},
		{
			text: "delete",
			action: () => alert("test2"),
		},
	];

	const menuOptionsFile = (idx) => [
		{
			text: "download",
			action: () => handleDownload(idx),
		},
		{
			text: "rename",
			action: () => alert("test"),
		},
		{
			text: "delete",
			action: () => alert("test2"),
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
					<h1 style={{ paddingLeft: "5px" }}>File Manager</h1>
				</Col>
			</Row>
			<hr className={s.hrStyled} />
			<Row className={s.rowTopStyled}>
				<Col xs={16}>
					<p className={s.pStyled}>{pathTrackerButtons}</p>
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
