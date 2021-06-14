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
}

const EntityViewComponent: React.FC<IEntityComponentProps> = ({
	iconName,
	entityText,
	entityTextAlt,
	onClick,
	onContextMenu,
}) => {
	return (
		<div className={s.entity} onClick={onClick} onContextMenu={onContextMenu}>
			<Container className={s.containerStyled}>
				<Row className={s.rowTop}>
					<Col className={s.colTopStyled}>
						<Icon size="massive" name={iconName} className={s.iconTopStyled} />
					</Col>
				</Row>
				<Row className={s.rowBot}>
					<Icon size="large" name={iconName} className={s.iconBotStyled} />
					<Col className={s.colBotStyled}>
						<p>{entityText}</p>
						<p>{entityTextAlt}</p>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export { EntityViewComponent };
