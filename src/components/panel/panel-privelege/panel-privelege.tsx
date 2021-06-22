import classNames from "classnames";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Dropdown, Icon, Menu, Button } from "semantic-ui-react";
import { changeRoute } from "../../history";
import s from "./panel-navigation.module.scss";

const PanelPrivelegeComponent: React.FC<any> = ({ handleBuy100, handleBuy500 }) => {
	return (
		<Container>
			<Button active onClick={() => handleBuy100()}>
				Buy 100
			</Button>
			<Button active onClick={() => handleBuy500()}>
				Buy 500
			</Button>
		</Container>
	);
};

export { PanelPrivelegeComponent };
