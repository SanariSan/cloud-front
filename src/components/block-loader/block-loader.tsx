import React from "react";
import { Icon } from "semantic-ui-react";

const BlockLoaderComponent: React.FC = () => {
	return (
		<div
			style={{
				backgroundColor: "black",
				opacity: 0.7,
				zIndex: 10,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "absolute",
				width: "100%",
				height: "100%",
			}}
		>
			<Icon loading color={"grey"} inverted size={"huge"} name="hourglass end" />
		</div>
	);
};

export { BlockLoaderComponent };
