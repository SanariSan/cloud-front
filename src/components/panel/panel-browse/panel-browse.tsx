import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-contexify/dist/ReactContexify.css";
import { Button } from "semantic-ui-react";
import { EntityComponent } from "../panel-entity";
import s from "./panel-browse.module.scss";
import { pathAtom, updatePath } from "../../../store/path";
import { useAtom } from "@dbeining/react-atom";
import { reqFsBrowse } from "../../../services/fs";
import { currentGroupInfoAtom } from "../../../store/current-group";

const PanelBrowseFilesComponent: React.FC = () => {
	const isActive = useRef(true);
	const path = useAtom(pathAtom);
	const currentGroupInfo = useAtom(currentGroupInfoAtom);
	const [currentPathContent, setCurrentPathContent] = useState({ files: [], folders: [] });

	const menuOptions = [
		{
			text: "test",
			action: () => alert("test"),
		},
		{
			text: "test2",
			action: () => alert("test2"),
		},
	];

	const onClickFolder: any = (event, elName) => {
		event.preventDefault();

		updatePath(path + `/${elName}`);
	};
	const onClickFile: any = (event, elName) => {
		event.preventDefault();

		alert("this is file, can't do anything yet");
	};

	const onContextMenu: any = async (event, show) => {
		event.preventDefault();
		show(event);
	};

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	useEffect(() => {
		if (isActive.current && currentGroupInfo) {
			updatePath("/");
		}
	}, [currentGroupInfo]);

	useEffect(() => {
		if (isActive.current && currentGroupInfo) {
			reqFsBrowse({ groupId: currentGroupInfo.id, path })
				.then(({ data }) => {
					console.log(data);
					setCurrentPathContent({ ...data });
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [path, currentGroupInfo]);

	let folders = currentPathContent.folders.map((el, idx) => {
		return (
			<EntityComponent
				idx={idx}
				menuOptions={menuOptions}
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
				menuOptions={menuOptions}
				onClick={(event) => onClickFile(event, el)}
				onContextMenu={onContextMenu}
				iconName={"file"}
				entityText={el}
			/>
		);
	});

	let pathPrepared = path.split("/").filter((el) => el);

	let pathTrackerTextArr = pathPrepared.map((acc, el) => `${acc}/${el}`);

	let pathTrackerButtons = pathPrepared.map((el, idx) => (
		<>
			<Button
				basic
				color="grey"
				onClick={() => {
					updatePath(pathTrackerTextArr[idx]);
				}}
			>
				/{el}
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
					<p className={s.pStyled}>
						{/* <Button
							basic
							color="grey"
							onClick={() => {
								updatePath(pathTrackerTextArr[0]);
							}}
						>
							/home
						</Button> */}
						{">"}
						{pathTrackerButtons}
						{pathTrackerTextArr[0]}
					</p>
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
