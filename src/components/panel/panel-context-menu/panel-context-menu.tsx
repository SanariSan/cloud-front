import React from "react";
import { Menu, Item, ItemParams } from "react-contexify";

interface IContextMenu {
	id: string;
	options: Array<{
		text: string;
		action: (arg: ItemParams) => void;
	}>;
}

const ContextMenu: React.FC<IContextMenu> = ({ id, options }) => {
	return (
		<Menu id={id}>
			{options.map(({ text, action }) => (
				<Item onClick={action}>{text}</Item>
			))}
		</Menu>
	);
};

export { ContextMenu };
