import React from "react";
import { Col } from "react-bootstrap";
import { useContextMenu } from "react-contexify";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";
import { ContextMenu } from "../panel-context-menu";
import { EntityViewComponent } from "./panel-entity-view";

const EntityComponent: React.FC<any> = ({ idx, menuOptions, onClick, onContextMenu }) => {
	const menuId = `menuId_${idx}`;
	const { show } = useContextMenu({
		id: menuId,
	});

	const [iconName, entityText]: [SemanticICONS, string] =
		Math.round(Math.random() * 1) < 1
			? ["folder open", "Folder name"]
			: ["file", "File name.txt"];

	return (
		<Col xs={10} sm={8} md={6} lg={5} xl={4}>
			<EntityViewComponent
				iconName={iconName}
				entityText={entityText}
				onClick={onClick}
				onContextMenu={(event) => onContextMenu(event, show)}
				entityTextAlt={"Some alt text"}
			/>
			<ContextMenu id={menuId} options={menuOptions} />
		</Col>
	);
};

export { EntityComponent };
