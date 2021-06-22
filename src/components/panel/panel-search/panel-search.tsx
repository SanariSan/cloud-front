import React, { useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { Input } from "semantic-ui-react";

const PanelSearchComponent: React.FC<any> = ({
	handleGroupSearch,
	handleGroupJoin,
	groupsFound,
}) => {
	const [groupName, setGroupName] = useState<string>("");
	const [email, setEmail] = useState<string>("");

	return (
		<Container fluid style={{ display: "flex", flexDirection: "row" }}>
			<Col xs={8} style={{ display: "flex", flexDirection: "column" }}>
				<Input
					label={"groupName"}
					value={groupName}
					onChange={(event) => {
						setEmail("");
						setGroupName(event.currentTarget.value);
					}}
				/>
				<Input
					label={"email"}
					value={email}
					onChange={(event) => {
						setGroupName("");
						setEmail(event.currentTarget.value);
					}}
				/>
				<Button active onClick={() => handleGroupSearch(groupName, email)}>
					Search
				</Button>
			</Col>
			<Col xs={8}>
				{groupsFound.map(({ ownerId, groupId, groupName }) => (
					<div
						onClick={() => {
							handleGroupJoin({ ownerId, groupId, groupName });
						}}
					>
						{JSON.stringify({
							ownerId,
							groupId,
							groupName,
						})}
					</div>
				))}
			</Col>
		</Container>
	);
};

export { PanelSearchComponent };
