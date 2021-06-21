import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Icon, Input, Menu } from "semantic-ui-react";
import { reqFsDownload } from "../../../services/fs";
import { reqGroupCreate } from "../../../services/group";
import { changeRoute } from "../../history";

const LandingHeaderComponent: React.FC = () => {
	const [req, setReq] = useState<any>(`{
        "method": "POST",
        "url": "http://localhost:3000/v1/xxx",
        "headers": {
            "Authorization": "Bearer 123"
        },
        "data": {
            "x": "345"
        }
    }`);

	const handleReq = async () => {
		const resp = await axios({
			...JSON.parse(req),
		}).catch((err: AxiosError) => {
			console.log(err.response);
			console.log(err.message);
		});

		console.log(resp);
	};

	return (
		<Container fluid>
			Landing head
			<Menu.Item as="a" onClick={() => changeRoute("/auth/register")}>
				<Icon name="lock" />
				Register
			</Menu.Item>
			<Menu.Item as="a" onClick={() => changeRoute("/auth/login")}>
				<Icon name="lock" />
				Login
			</Menu.Item>
			<Container fluid>
				Request object
				<textarea
					style={{
						width: "60%",
						height: "30%",
					}}
					value={req}
					onChange={(event) => setReq(event.currentTarget.value)}
				/>
				<Button active onClick={() => handleReq()}>
					Fetch
				</Button>
			</Container>
		</Container>
	);
};

export { LandingHeaderComponent };
