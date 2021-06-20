import classNames from "classnames";
import React, { SyntheticEvent, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Dropdown, DropdownProps, Icon, Menu, Sidebar } from "semantic-ui-react";
import { useLocalStorage } from "../../../hooks";
import { changeRoute } from "../../history";
import s from "./panel-navigation.module.scss";

const PanelNavigation: React.FC<any> = ({
	visible,
	direction,
	animation,
	closeSidebar,
	mainContentRef,
	userGroupOwnage,
	userGroupsInfo,
	storageInfo,
	currentGroupInfo,
	setCurrentGroupInfo,
}) => {
	//userGroupsInfo = [{id, name},...]
	const selectGroupOptions = userGroupsInfo.map((el) => ({
		key: el.id,
		text: el.name,
		value: el.id,
	}));

	const handleChange = (event: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps) => {
		const chosenGroup = userGroupsInfo.filter((el) => el.id === value);
		if (chosenGroup && chosenGroup.length !== 0) {
			setCurrentGroupInfo({
				id: chosenGroup[0].id,
				name: chosenGroup[0].name,
			});
		}
	};

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
									Spaces search
								</Menu.Item>

								<Menu.Item as="a" onClick={() => changeRoute("/panel/privelege")}>
									<Icon name="money" />
									Privelege
								</Menu.Item>

								{/* <Menu.Item as="a" onClick={() => changeRoute("/panel/test")}>
									<Icon name="home" />
									Test
								</Menu.Item> */}
							</Menu>
						</Col>
					</Row>
				</div>
				<div className={s.wrapBot}>
					<hr className={s.hrStyled} />
					<Row>
						<Col className={s.col}>
							<Icon size="big" name="server" className={s.iFix} />
							<p>
								{storageInfo
									? `${Math.round(storageInfo.sizeUsed)} MB of ${Math.round(
											storageInfo.sizeMax,
									  )} MB used`
									: "Please, create group or join one!"}
							</p>
						</Col>
					</Row>
					<hr className={s.hrStyled} />
					<Row>
						<Col className={classNames(s.col, s.groupBot)}>
							<span className={s.groupInfo}>
								<p className={s.pStyled}>Current Group</p>
							</span>
							<Dropdown
								placeholder={"Select group"}
								upward
								floating
								options={selectGroupOptions}
								onChange={handleChange}
								value={currentGroupInfo ? currentGroupInfo.id : void 0}
							></Dropdown>
						</Col>
					</Row>
				</div>
			</Container>
		</Sidebar>
	);
};

export { PanelNavigation };
