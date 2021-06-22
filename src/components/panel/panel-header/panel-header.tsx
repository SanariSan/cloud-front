import { useAtom } from "@dbeining/react-atom";
import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Dropdown, Icon, Image } from "semantic-ui-react";
import { clearWholeLocalStorage, ResponseStatus } from "../../../helpers/services";
import avatar from "../../../img/avatar.png";
import logo from "../../../img/logo.png";
import { reqAccessLogout } from "../../../services/access";
import { toggleBlockLoader } from "../../../store/block-loader";
import { profileInfoAtom } from "../../../store/profile-info";
import { changeRoute } from "../../history";
import s from "./panel-header.module.scss";

const PanelHeaderComponent: React.FC<any> = ({ toggleSidebar }) => {
	const isActive = useRef(true);
	const profileInfo = useAtom(profileInfoAtom);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	const logout = async () => {
		if (isActive.current) {
			toggleBlockLoader(true);

			await reqAccessLogout().catch((err) => {
				if (err.status === ResponseStatus.BAD_REQUEST) {
					alert(err.message);
				}
			});

			clearWholeLocalStorage();
			changeRoute("/auth");
			toggleBlockLoader(false);
		}
	};

	return (
		<Container fluid className={s.panelHeader}>
			<Row className={s.row}>
				<Col xs={6} sm={3} md={2} className={s.col}>
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
				<Col xs={7} sm={6} md={5} lg={4} xl={3} className={classNames(s.col, s.right)}>
					<Icon link name="bell" color="grey" inverted />
					<Image src={avatar} size="mini" />
					<p className={s.pStyled}>{profileInfo?.email || "profile"}</p>
					<Dropdown direction="left" closeOnChange={true}>
						<Dropdown.Menu>
                        <Dropdown.Header icon='tags' content={profileInfo?.email || "profile"} />
							<Dropdown.Item
								text="Settings"
								onClick={() => changeRoute("/panel/settings")}
							/>
							<Dropdown.Item text="Logout" onClick={logout} />
						</Dropdown.Menu>
					</Dropdown>
				</Col>
			</Row>
		</Container>
	);
};

export { PanelHeaderComponent };
