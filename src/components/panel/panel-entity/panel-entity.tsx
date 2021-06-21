import React from "react";
import { Col } from "react-bootstrap";
import { useContextMenu } from "react-contexify";
import { ContextMenu } from "../panel-context-menu";
import { EntityViewComponent } from "./panel-entity-view";

const EntityComponent: React.FC<any> = ({
	idx,
	menuOptions,
	onClick,
	onContextMenu,
	iconName,
	entityText,
}) => {
	const menuId = `menuId_${idx}`;
	const { show } = useContextMenu({
		id: menuId,
	});

	return (
		<Col xs={10} sm={8} md={6} lg={5} xl={4}>
			<EntityViewComponent
				iconName={iconName}
				entityText={entityText}
				onClick={onClick}
				onContextMenu={(event) => onContextMenu(event, show)}
				entityTextAlt={""}
			/>
			<ContextMenu id={menuId} options={menuOptions} />
		</Col>
	);
};

export { EntityComponent };
