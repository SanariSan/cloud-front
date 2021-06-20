import React from "react";
import { PanelBrowseFiles } from "../../../components/panel";
import { useLocalStorage } from "../../../hooks";

const PanelBrowseContainer: React.FC = () => {
	//browse path state
	//effects for update list
	//calls to api for actions, pass them as props

	const [currentGroupInfo, setCurrentGroupInfo] = useLocalStorage("currentGroupInfo", null);

	return (
		<>
			{currentGroupInfo ? <PanelBrowseFiles /> : <p>PLEASE CHOOSE GROUP TO START WORKING!</p>}
		</>
	);
};

export { PanelBrowseContainer };
