import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Icon, Input, Menu } from "semantic-ui-react";
import { reqFsDownload } from "../../../services/fs";
import { reqGroupCreate } from "../../../services/group";
import { changeRoute } from "../../history";

const LandingHeaderComponent: React.FC = () => {
	const [url, setUrl] = useState<any>("");
	const [method, setMethod] = useState<any>("GET");
	const [headers, setHeaders] = useState<any>("");
	const [data, setData] = useState<any>("");

	const handleReq = async () => {
		const resp = await axios({
			method: method,
			url: url,
			headers: {
				...JSON.parse(headers),
			},
			data: data ? JSON.parse(data) : void 0,
		}).catch((err: AxiosError) => {
			console.log(err.response);
			console.log(err.message);
		});

		console.log(resp);
	};

	return (
		<Container>
			<button
				onClick={() =>
					reqFsDownload({ groupId: "2", path: "/folder", filename: "test1.txt" })
				}
			>
				download
			</button>
			<button onClick={() => reqGroupCreate({ groupName: "test12", password: "test12" })}>
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
			<Input
				label={"method"}
				value={method}
				onChange={(event) => setMethod(event.currentTarget.value)}
			/>
			<Input
				label={"headers"}
				value={headers}
				onChange={(event) => setHeaders(event.currentTarget.value)}
			/>
			<Input
				label={"data"}
				value={data}
				onChange={(event) => setData(event.currentTarget.value)}
			/>
			<Button active onClick={() => handleReq()}>
				Fetch
			</Button>
		</Container>
	);
};

export { LandingHeaderComponent };
