import React, { MouseEventHandler } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-contexify/dist/ReactContexify.css";
import { Button } from "semantic-ui-react";
import { EntityComponent } from "../panel-entity";
import s from "./panel-browse.module.scss";

const PanelBrowseFiles: React.FC = () => {
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

	const onClick: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault();
		alert("Some logic to update-change entities");
	};
	const onContextMenu: any = async (event, show) => {
		event.preventDefault();
		show(event);
	};

	let arr = new Array(10).fill(null).map((el, idx) => {
		return (
			<EntityComponent
				idx={idx}
				menuOptions={menuOptions}
				onClick={onClick}
				onContextMenu={onContextMenu}
			/>
		);
	});

	return (
		<Container fluid className={s.containerStyled}>
			<Row className={s.rowTopStyled}>
				<Col xs={16}>
					<p className={s.pStyled}>
						<Button basic color="grey">
							Folder123
						</Button>
						{">"}
						<Button basic color="grey">
							Folder456
						</Button>
					</p>
				</Col>
			</Row>
			<hr className={s.hrStyled} />
			<Row className={s.rowBotStyled}>{arr}</Row>
		</Container>
	);
};

export { PanelBrowseFiles };
