import React, { useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { Input } from "semantic-ui-react";

const PanelSearchComponent: React.FC<any> = ({ handleSearch, groupsFound }) => {
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
				<Button active onClick={() => handleSearch(groupName, email)}>
					Search
				</Button>
			</Col>
			<Col xs={8}>
				{JSON.stringify(
					groupsFound.map((el) => ({
						owner: el.ownerId,
						groupId: el.groupId,
						groupName: el.groupNames,
					})),
				)}
			</Col>
		</Container>
	);
};

export { PanelSearchComponent };
