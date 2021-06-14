import React, { MouseEventHandler } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { ContextMenu } from "../panel-context-menu";
import { EntityComponent } from "../panel-entity";
import s from "./panel-browse.module.scss";

const PanelBrowseFiles: React.FC = () => {
	const menuId = "menuId";
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

	const { show } = useContextMenu({
		id: menuId,
	});

	const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		alert("Some logic to change entities below happening");
	};
	const onContextMenu: MouseEventHandler<HTMLDivElement> = async (event) => {
		event.preventDefault();
		show(event);
	};

	let arr = new Array(10).fill(null).map((el) => (
		<Col xs={9} md={7} lg={5} xl={4} className={s.colStyled}>
			<EntityComponent
				iconName={"folder open"}
				entityText={"Folder name"}
				onClick={onClick}
				onContextMenu={onContextMenu}
				entityTextAlt={"Some alt text"}
			/>
			<ContextMenu id={menuId} options={menuOptions} />
		</Col>
	));

	return (
		<Container fluid className={s.containerStyled}>
			<Row className={s.rowStyled}>
				<Col xs={16}>
					<p className={s.pStyled}>Folder123 / Folder456</p>
				</Col>
			</Row>
			<Row className={s.rowStyled2}>{arr}</Row>
		</Container>
	);
};

export { PanelBrowseFiles };
