import React from "react";
import { Col } from "react-bootstrap";
import { useContextMenu } from "react-contexify";
import { ContextMenu } from "../panel-context-menu";
import "react-contexify/dist/ReactContexify.css";
import { EntityViewComponent } from "./panel-entity-view";

const EntityComponent: React.FC<any> = ({
	idx,
	menuOptions,
	onClick,
	onContextMenu,
	iconName,
	type, //small / big
	entityText,
	entityTextAlt,
	selected,
}) => {
	const menuId = `menuId_${idx}`;
	const { show } = useContextMenu({
		id: menuId,
	});

	return (
		<>
			{type === "big" ? (
				<Col xs={10} sm={8} md={6} lg={5} xl={4}>
					<EntityViewComponent
						iconName={iconName}
						entityText={entityText}
						onClick={onClick}
						onContextMenu={(event) => onContextMenu(event, show)}
						entityTextAlt={entityTextAlt || ""}
						type={type}
					/>
					<ContextMenu id={menuId} options={menuOptions} />
				</Col>
			) : type === "small" ? (
				<Col
					xs={16}
					md={6}
					style={{ margin: "10px", border: selected ? "2px solid black" : "none" }}
				>
					<EntityViewComponent
						iconName={iconName}
						entityText={entityText}
						onClick={onClick}
						onContextMenu={(event) => onContextMenu(event, show)}
						entityTextAlt={entityTextAlt || ""}
						type={type}
					/>
				</Col>
			) : null}
		</>
	);
};

export { EntityComponent };
