import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Icon, Menu } from "semantic-ui-react";
import { setLSValue } from "../../../helpers/browser";
import { fsDownload } from "../../../services/fs";
import { groupCreate } from "../../../services/group";
import { changeRoute } from "../../history";

const LandingHeaderComponent: React.FC = () => {
	return (
		<Container>
			<button
				onClick={() => fsDownload({ groupId: "2", path: "/folder", filename: "test1.txt" })}
			>
				download
			</button>
			<button onClick={() => groupCreate({ groupName: "test12", password: "test12" })}>
				createGroup
			</button>
			<Menu.Item as="a" onClick={() => changeRoute("/auth")}>
				<Icon name="lock" />
				Auth
			</Menu.Item>
			Landing head
		</Container>
	);
};

export { LandingHeaderComponent };
