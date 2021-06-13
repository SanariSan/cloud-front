import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Icon, Menu, Sidebar, Button } from "semantic-ui-react";
import { changeRoute } from "../../history";
import s from "./panel-navigation.module.scss";

const PanelNavigation: React.FC<any> = ({
	visible,
	direction,
	animation,
	closeSidebar,
	mainContentRef,
}) => {
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
							<Button size="medium" icon content="Upload" color="purple">
								<Icon size="big" name="cloud upload" />
								Upload
							</Button>
							<Button size="medium" icon color="purple">
								<Icon.Group size="small">
									<Icon size="big" name="folder" />
									<Icon size="big" corner inverted color="grey" name="add" />
								</Icon.Group>
							</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							<Menu secondary vertical>
								<Menu.Item as="a" onClick={() => changeRoute("/panel/browse")}>
									<Icon name="file" />
									Browse
								</Menu.Item>

								<Menu.Item as="a" onClick={() => changeRoute("/panel/search")}>
									<Icon name="search" />
									Search
								</Menu.Item>

								<Menu.Item as="a" onClick={() => changeRoute("/panel/privelege")}>
									<Icon name="money" />
									Privelege
								</Menu.Item>

								<Menu.Item as="a" onClick={() => changeRoute("/panel/settings")}>
									<Icon name="settings" />
									Settings
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
					<Row>
						<Col className={s.col}></Col>
					</Row>
					<Row>
						<Col className={s.col}></Col>
					</Row>
				</div>
			</Container>
		</Sidebar>
	);
};

export { PanelNavigation };
