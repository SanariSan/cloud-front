import classNames from "classnames";
import React from "react";
import { Button } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import s from "./panel-settings.module.scss";

const PanelSettingsComponent: React.FC = () => {
	return (
		<Container fluid className={s.fullSize}>
			<Row className={classNames(s.fullSize, s.settingsBlocksWrap)}>
				<Col xs={14} lg={7} className={classNames(s.settingsBlock)}>
					<Row className={s.rowSideTop}>Name</Row>
					<Row className={s.rowMiddle}>Content</Row>
					<Row className={s.rowSideBot}>
						<Button active className={s.btn}>
							button
						</Button>
					</Row>
				</Col>
				<Col xs={14} lg={7} className={classNames(s.settingsBlock)}>
					<Row className={s.rowSideTop}>Name</Row>
					<Row className={s.rowMiddle}>Content</Row>
					<Row className={s.rowSideBot}>
						<Button active className={s.btn}>
							button
						</Button>
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export { PanelSettingsComponent };
