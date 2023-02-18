import { useAtom } from "@dbeining/react-atom";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Image } from "semantic-ui-react";
import img1 from "../../../img/asset1.png";
import img2 from "../../../img/asset2.png";
import img3 from "../../../img/asset3.png";
import { translateAtom } from "../../../store/translate";
import s from "./landing-body.module.scss";

const LandingBodyComponent: React.FC<any> = () => {
	const translated = useAtom(translateAtom);

	return (
		<Container fluid className={s.wrapGlobal}>
			<Row className={s.top}>
				<Col xs={14} md={7} xl={4} className={s.colStyled}>
					<Image src={img1} size={"small"} style={{ paddingTop: "10px" }} />
					<h2 className={s.h2Styled}>
						{translated ? "Храни любые файлы" : "Store any files"}
					</h2>
					<p>
						{translated
							? "Храни любые типы данных в удаленном и надежном месте. Получи первые гигабайты бесплатно!"
							: "Keep any kind of files in a safe remote place. Your first GB are completely free!"}
					</p>
				</Col>
				<Col xs={14} md={7} xl={6} className={s.colStyled}>
					<Image src={img2} size={"small"} style={{ paddingTop: "10px" }} />
					<h2 className={s.h2Styled}>
						{translated ? "Получай доступ откуда угодно" : "See your stuff anywhere"}
					</h2>
					<p>
						{translated
							? "Получить доступ к StoreTon можно из любого места, с любого телефона, планшета, пк!"
							: "You can access your files in StoreTon from any device, such as pc, table, smartphone!"}
					</p>
				</Col>
				<Col xs={14} md={7} xl={4} className={s.colStyled}>
					<Image src={img3} size={"small"} style={{ paddingTop: "10px" }} />
					<h2 className={s.h2Styled}>
						{translated ? "Делись файлами с другими" : "Share files and folders"}
					</h2>
					<p>
						{translated
							? "Создавай свои группы и давай доступ другим, повысь свою продуктивность до максимума!"
							: "Create your own group and share access with others, level up your productivity! "}
					</p>
				</Col>
			</Row>
		</Container>
	);
};

export { LandingBodyComponent };
