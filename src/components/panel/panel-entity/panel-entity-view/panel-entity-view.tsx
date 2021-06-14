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
	//big icon name
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
					<Col>
						<Icon size="massive" name={iconName} />
					</Col>
				</Row>
				{/* <hr className={s.hrStyled} /> */}
				<Row className={s.rowBot}>
					<Icon size="small" name={iconName} />
					<Col xs={12}>{entityText}</Col>
					<Col xs={12}>{entityTextAlt}</Col>
				</Row>
			</Container>
		</div>
	);
};

export { EntityViewComponent };
