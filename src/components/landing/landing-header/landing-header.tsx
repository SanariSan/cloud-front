import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Icon, Input, Menu } from "semantic-ui-react";
import { setLSValue } from "../../../helpers/browser";
import { fsDownload } from "../../../services/fs";
import { groupCreate } from "../../../services/group";
import { changeRoute } from "../../history";

const LandingHeaderComponent: React.FC = () => {
	const [url, setUrl] = useState("");

	const handleReq = async () => {
		const resp = await axios({
			method: "GET",
			url: url,
		}).catch((err: AxiosError) => {
			console.log(err.response);
			console.log(err.message);
		});

		console.log(resp);
	};

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
			<Input
				label={"url"}
				value={url}
				onChange={(event) => setUrl(event.currentTarget.value)}
			/>
			<Button active onClick={() => handleReq()}>
				Fetch
			</Button>
		</Container>
	);
};

export { LandingHeaderComponent };
