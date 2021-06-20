import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Input } from "semantic-ui-react";

const BlockCreateGroupComponent: React.FC<any> = ({ handleGroupCreate }) => {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<div>
			<Input
				label={"Group name"}
				value={name}
				onChange={(event) => setName(event.currentTarget.value)}
			/>
			<Input
				label={"Group password"}
				value={password}
				onChange={(event) => setPassword(event.currentTarget.value)}
			/>
			<Button active onClick={() => handleGroupCreate(name, password)}>
				Create Group
			</Button>
			<div
				style={{
					position: "absolute",
					left: 0,
					top: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "black",
					opacity: "0.8",
					zIndex: -1,
				}}
			></div>
		</div>
	);
};

export { BlockCreateGroupComponent };
