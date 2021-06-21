import React from "react";
import { changeRoute } from "../history";

const NotFound: React.FC = () => {
	return (
		<div className="">
			Not Found or No Rights to access{" "}
			<button onClick={() => changeRoute("/")}>Back to main</button>
		</div>
	);
};

export { NotFound };
