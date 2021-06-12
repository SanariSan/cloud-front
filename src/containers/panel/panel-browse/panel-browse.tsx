import React from "react";
import { PanelBrowseFiles, PanelBrowseActions } from "../../../components/panel";

const PanelBrowseContainer: React.FC = () => {
	return (
		<div>
			<PanelBrowseFiles />
			<PanelBrowseActions />
		</div>
	);
};

export { PanelBrowseContainer };
