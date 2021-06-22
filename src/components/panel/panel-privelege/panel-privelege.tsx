import classNames from "classnames";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Dropdown, Icon, Menu, Button } from "semantic-ui-react";
import { changeRoute } from "../../history";
import s from "./panel-privelege.module.scss";

const PanelPrivelegeComponent: React.FC<any> = ({ handleBuy100, handleBuy500 }) => {
	return (
		<div className={s.wrapGlobal}>
			<h1>Choose your plan</h1>
			<Container className={s.containerStyled}>
				<Row className={s.rowStyled}>
					<Col xs={15} md={7} className={s.colStyled}>
						<div>
							<h1 className={s.h1Styled}>100 GB</h1>
							<h2 className={s.h2Styled}>$1.19 / month</h2>
						</div>
						<p>100 gb of space for secure storage</p>
						<Button color="violet" inverted onClick={() => handleBuy100()}>
							Choose plan
						</Button>
					</Col>

					<Col xs={15} md={7} className={s.colStyled}>
						<div>
							<h1 className={s.h1Styled}>500 GB</h1>
							<h2 className={s.h2Styled}>$5.59 / month</h2>
						</div>
						<p>500 gb of space for secure storage</p>
						<Button color="violet" inverted onClick={() => handleBuy500()}>
							Choose plan
						</Button>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export { PanelPrivelegeComponent };
