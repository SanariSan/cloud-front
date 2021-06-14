import classNames from "classnames";
import React, { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Dropdown, Icon, Menu, Sidebar } from "semantic-ui-react";
import { changeRoute } from "../../history";
import s from "./panel-navigation.module.scss";

const PanelNavigation: React.FC<any> = ({
	visible,
	direction,
	animation,
	closeSidebar,
	mainContentRef,
}) => {
	const options = [
		{ key: 1, text: "One", value: 1 },
		{ key: 2, text: "Two", value: 2 },
		{ key: 3, text: "Three", value: 3 },
	];

	return (
		<Sidebar
			visible={visible}
			direction={direction}
			animation={animation}
			onHide={closeSidebar}
			target={mainContentRef}
			className={s.navbar}
		>
			<Container className={s.containerCustom}>
				<div className={s.wrapTop}>
					<Row>
						<Col className={s.col}>
							<Icon link size="big" name="cloud upload" />
							<Icon.Group size="large">
								<Icon link size="large" name="folder" />
								<Icon size="small" corner inverted color="grey" name="add" />
							</Icon.Group>
						</Col>
					</Row>
					<hr className={s.hrStyled} />
					<Row>
						<Col>
							<Menu secondary vertical>
								<Menu.Item as="a" onClick={() => changeRoute("/panel/browse")}>
									<Icon name="file" />
									File Manager
								</Menu.Item>

								<Menu.Item as="a" onClick={() => changeRoute("/panel/search")}>
									<Icon name="search" />
									Search spaces
								</Menu.Item>

								<Menu.Item as="a" onClick={() => changeRoute("/panel/privelege")}>
									<Icon name="money" />
									Privelege
								</Menu.Item>

								<Menu.Item as="a" onClick={() => changeRoute("/panel/test")}>
									<Icon name="home" />
									Test
								</Menu.Item>
							</Menu>
						</Col>
					</Row>
				</div>
				<div className={s.wrapBot}>
					<hr className={s.hrStyled} />
					<Row>
						<Col className={s.col}>
							<Icon size="big" name="server" className={s.iFix} />
							<p>1.2 GB of 10 GB used</p>
						</Col>
					</Row>
					<hr className={s.hrStyled} />
					<Row>
						<Col className={classNames(s.col, s.groupBot)}>
							<span className={s.groupInfo}>
								<p className={s.pStyled}>Current Group</p>
							</span>
							<Dropdown upward floating options={options}>
								{/* <Dropdown.Menu>
									<Dropdown.Item text="Settings" />
									<Dropdown.Item text="Logout" />
								</Dropdown.Menu> */}
							</Dropdown>
						</Col>
					</Row>
				</div>
			</Container>
		</Sidebar>
	);
};

export { PanelNavigation };
