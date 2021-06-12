import classNames from "classnames";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Icon, Image } from "semantic-ui-react";
import avatar from "../../../img/avatar.png";
import logo from "../../../img/logo.png";
import s from "./panel-header.module.scss";

const PanelHeaderComponent: React.FC = () => {
	return (
		<Container fluid className={s.panelHeader}>
			<Row className={s.row}>
				<Col xl={10} lg={9} md={8} className={s.col}>
					<Image src={logo} />
				</Col>
				<Col xl={2} lg={3} md={4} className={classNames(s.col, s.right)}>
					<Icon link name="bell" color="grey" inverted />
					<Image src={avatar} size="mini" />
					<div className={s.accountName}>
						email@addr.com
						<Icon link name="dropdown" color="grey" inverted />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export { PanelHeaderComponent };
