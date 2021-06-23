import React, { MouseEventHandler } from "react";
import { Container, Row, Col } from "react-bootstrap";
import s from "./panel-entity-view.module.scss";
import { Icon, SemanticICONS } from "semantic-ui-react";

interface IEntityComponentProps {
	iconName: SemanticICONS;
	entityText: string;
	onClick: MouseEventHandler<HTMLDivElement>;
	onContextMenu: MouseEventHandler<HTMLDivElement>;
	entityTextAlt?: string;
	type: string;
}

const EntityViewComponent: React.FC<IEntityComponentProps> = ({
	iconName,
	entityText,
	entityTextAlt,
	onClick,
	onContextMenu,
	type,
}) => {
	return (
		<div
			className={type === "big" ? s.entityBig : s.entitySmall}
			onClick={onClick}
			onContextMenu={onContextMenu}
		>
			<Container className={s.containerStyled}>
				<Row className={s.rowTop}>
					<Col className={s.colTopStyled}>
						<Icon
							size={type === "big" ? "massive" : "huge"}
							name={iconName}
							className={s.iconTopStyled}
						/>
					</Col>
				</Row>
				<Row className={s.rowBot}>
					<Icon
						size={type === "big" ? "large" : "small"}
						name={iconName}
						className={s.iconBotStyled}
						style={{ display: type === "big" ? "block" : "none" }}
					/>
					<Col className={s.colBotStyled}>
						<p className={s.pStyled}>{entityText}</p>
						<p>{entityTextAlt || ""}</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export { EntityViewComponent };
