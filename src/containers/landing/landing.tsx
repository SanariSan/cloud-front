import React from "react";
import {
	LandingBodyComponent,
	LandingHeaderComponent,
	LandingBotComponent,
} from "../../components/landing";

const LandingContainer: React.FC = () => {
	return (
		<div
			style={{
				backgroundColor: "white",
				width: "100%",
				height: "100%",
				overflow: "visible",
			}}
		>
			<LandingHeaderComponent />
			<LandingBodyComponent />
			<hr style={{ width: "80%", margin: "auto" }} />
			<LandingBotComponent />
			<hr style={{ width: "100%", margin: "auto" }} />
			<p style={{ padding: "30px" }}>@StoreTon 2021, all rights reserved.</p>
		</div>
	);
};

export { LandingContainer };
