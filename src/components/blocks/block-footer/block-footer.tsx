import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import s from "./block-footer.module.scss";

const Footer: React.FC = () => {
	return (
		<>
			<Container>
				<Row>
					<Col xs={12} md={6} lg={4} className={s.rect}>
						text text text
					</Col>
					<Col xs={12} md={6} lg={4} className={s.rect}>
						text text text
					</Col>
					<Col xs={12} lg={4} className={s.rect}>
						text text text
					</Col>
				</Row>
			</Container>
		</>
	);
};

export { Footer };
