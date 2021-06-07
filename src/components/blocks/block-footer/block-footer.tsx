import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import s from "./block-footer.module.scss";

const Footer: React.FC = () => {
	return (
		<>
			<br />
			<br />
			<br />
			<br />
			<Container>
				{/* Stack the columns on mobile by making one full-width and the other half-width */}
				<Row>
					<Col xs={12} md={8} className={s.rect}>
						xs=12 md=8
					</Col>
					<Col xs={6} md={4} className={s.rect}>
						xs=6 md=4
					</Col>
				</Row>

				{/* Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop */}
				<Row>
					<Col xs={6} md={4} className={s.rect}>
						xs=6 md=4
					</Col>
					<Col xs={6} md={4} className={s.rect}>
						xs=6 md=4
					</Col>
					<Col xs={6} md={4} className={s.rect}>
						xs=6 md=4
					</Col>
				</Row>

				{/* Columns are always 50% wide, on mobile and desktop */}
				<Row>
					<Col xs={6} className={s.rect}>
						xs=6
					</Col>
					<Col xs={6} className={s.rect}>
						xs=6
					</Col>
				</Row>
			</Container>
		</>
	);
};

export { Footer };
