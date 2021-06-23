import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Image } from "semantic-ui-react";
import img from "../../../img/img_bot.png";
import s from "./landing-bot.module.scss";
import { translateAtom } from "../../../store/translate";
import { useAtom } from "@dbeining/react-atom";

const LandingBotComponent: React.FC<any> = () => {
	const translated = useAtom(translateAtom);

	return (
		<Container fluid className={s.wrapGlobal}>
			<Row className={s.top}>
				<Col xs={15} lg={5} className={s.colStyled}>
					<h2 className={s.h2Styled}>
						{translated ? "Ваши файлы под защитой" : "Keep your files safe"}
					</h2>
					<hr
						style={{
							width: "50px",
							height: "3px",
							color: "black",
							margin: "20px auto",
						}}
					/>
					<p>
						{translated
							? "Если что-то случится с вашим устройством - не стоит волноваться, ведь все данные находятся в сохранности в вашем StoreTon."
							: "If something happens to your device, you don't have to worry about loosing your files or photos - they are in your StoreTon."}
					</p>
				</Col>
				<Col xs={15} lg={9} className={s.colStyled}>
					<Image src={img} size={"big"} style={{ paddingTop: "10px" }} />
				</Col>
			</Row>
		</Container>
	);
};

export { LandingBotComponent };
