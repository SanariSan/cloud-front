import { useAtom } from "@dbeining/react-atom";
import React from "react";
import { Col, Container } from "react-bootstrap";
import { Button, Image } from "semantic-ui-react";
import logo from "../../../img/logo.png";
import { toggleTranslate, translateAtom } from "../../../store/translate";
import { changeRoute } from "../../history";
import s from "./landing-header.module.scss";

const LandingHeaderComponent: React.FC = () => {
	const translated = useAtom(translateAtom);

	return (
		<Container fluid className={s.wrapGlobal}>
			<div className={s.top}>
				<Col xs={8}>
					<Image src={logo} style={{ paddingTop: "10px", cursor: "pointer" }} />
				</Col>
				<Col></Col>
				<Col
					xs={8}
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-end",
						flexWrap: "nowrap",
						textAlign: "right",
					}}
				>
					<span>
						<Button color={"violet"} onClick={() => changeRoute("/auth/register")}>
							Register
						</Button>
						<Button color={"violet"} onClick={() => changeRoute("/auth/login")}>
							Login
						</Button>
						<Button color={"instagram"} onClick={() => toggleTranslate()}>
							Translate
						</Button>
					</span>
				</Col>
			</div>
			<div className={s.middle}>
				<h1 className={s.headerText}>StoreTon</h1>
				<p style={{ margin: "30px 20px 30px 20px", textAlign: "center" }}>
					{translated
						? "Регистрируйся или войди в аккаунт и начни загружать, получать доступ и управлять своими файлами из любого места, с любого устройства, бесплатно."
						: "Register or Login now to upload, backup, manage and access your files from any device, from anywhere, free."}
				</p>
				<Button color={"violet"} onClick={() => changeRoute("/auth/register")}>
					Register now
				</Button>
			</div>
		</Container>
	);
};

export { LandingHeaderComponent };
