import classNames from "classnames";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "semantic-ui-react";
import s from "./panel-privelege.module.scss";

const PanelPrivelegeComponent: React.FC<any> = ({ handleBuy100, handleBuy500, translated }) => {
	return (
		<div className={s.wrapGlobal}>
			<Container className={s.containerStyled}>
				<Row className={s.rowStyled}>
					<Col xs={16} className={classNames(s.colStyled, s.titleContent)}>
						<h1>{translated ? "Выберите план" : "Choose your plan"}</h1>
					</Col>
				</Row>
				<Row className={s.rowStyled}>
					<Col xs={16} md={8} className={s.colStyled}>
						<div className={s.boxContent}>
							<div>
								<h1 className={s.h1Styled}>100 GB</h1>
								<h2 className={s.h2Styled}>
									$1.19 / {translated ? "месяц" : "month"}
								</h2>
							</div>
							<p>
								{translated
									? "100 gb места для безопасного хранения"
									: "100 gb of space for secure storage"}
							</p>
							<Button color="violet" inverted onClick={() => handleBuy100()}>
								{translated ? "Выбрать план" : "Choose plan"}
							</Button>
						</div>
					</Col>

					<Col xs={16} md={8} className={s.colStyled}>
						<div className={s.boxContent}>
							<div>
								<h1 className={s.h1Styled}>500 GB</h1>
								<h2 className={s.h2Styled}>
									$5.59 / {translated ? "месяц" : "month"}
								</h2>
							</div>
							<p>
								{translated
									? "100 gb места для безопасного хранения"
									: "500 gb of space for secure storage"}
							</p>
							<Button color="violet" inverted onClick={() => handleBuy500()}>
								{translated ? "Выбрать план" : "Choose plan"}
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export { PanelPrivelegeComponent };
