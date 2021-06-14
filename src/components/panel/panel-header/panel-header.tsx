import classNames from "classnames";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Dropdown, Icon, Image } from "semantic-ui-react";
import avatar from "../../../img/avatar.png";
import logo from "../../../img/logo.png";
import { changeRoute } from "../../history";
import s from "./panel-header.module.scss";

const PanelHeaderComponent: React.FC<any> = ({ toggleSidebar }) => {
	return (
		<Container fluid className={s.panelHeader}>
			<Row className={s.row}>
				<Col md={2} className={s.col}>
					<Image
						src={logo}
						className={s.imgStyled}
						onClick={() => changeRoute("/panel")}
					/>
				</Col>
				<Col xs={1} className={s.col}>
					<Icon link size="large" name="bars" onClick={toggleSidebar} />
				</Col>
				<Col></Col>
				<Col xs={6} lg={4} xl={3} className={classNames(s.col, s.right)}>
					<Icon link name="bell" color="grey" inverted />
					<Image src={avatar} size="mini" />
					<Dropdown text="email@addr.com">
						<Dropdown.Menu>
							<Dropdown.Item
								text="Settings"
								onClick={() => changeRoute("/panel/settings")}
							/>
							<Dropdown.Item text="Logout" onClick={() => alert("logout")} />
						</Dropdown.Menu>
					</Dropdown>
				</Col>
			</Row>
		</Container>
	);
};

export { PanelHeaderComponent };
