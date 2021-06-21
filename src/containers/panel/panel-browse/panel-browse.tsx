import { useAtom } from "@dbeining/react-atom";
import React from "react";
import { PanelBrowseFilesComponent } from "../../../components/panel";
import { currentGroupInfoAtom } from "../../../store/current-group";

const PanelBrowseContainer: React.FC = () => {
	//browse path state
	//effects for update list
	//calls to api for actions, pass them as props
	const currentGroupInfo = useAtom(currentGroupInfoAtom);

	return (
		<>
			{currentGroupInfo ? (
				<PanelBrowseFilesComponent />
			) : (
				<p>PLEASE CHOOSE GROUP TO START WORKING!</p>
			)}
		</>
	);
};

export { PanelBrowseContainer };
