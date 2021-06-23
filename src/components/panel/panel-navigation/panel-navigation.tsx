import classNames from "classnames";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { changeRoute } from "../../history";
import s from "./panel-navigation.module.scss";
import { translateAtom } from "../../../store/translate";
import { useAtom } from "@dbeining/react-atom";

const PanelNavigationComponent: React.FC<any> = ({
	storageInfo,
	groupOwnage,
	currentGroupInfo,
	selectGroupOptions,
	handleChange,
	handleUpload,
	handleCreateFolder,
}) => {
	const translated = useAtom(translateAtom);

	return (
		<Container className={s.containerCustom}>
			<div className={s.wrapTop}>
				<Row>
					<Col className={s.col}>
						<input
							id="upload-file"
							type="file"
							onChange={handleUpload}
							className={s.upload}
							multiple={true}
						/>
						<label htmlFor={"upload-file"}>
							<Icon link size="big" name="cloud upload" />
						</label>
						<Icon.Group size="large" onClick={handleCreateFolder}>
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
								{translated ? "Файловый менеджер" : "File Manager"}
							</Menu.Item>

							<Menu.Item as="a" onClick={() => changeRoute("/panel/search")}>
								<Icon name="search" />
								{translated ? "Поиск групп" : "Spaces search"}
							</Menu.Item>

							<Menu.Item as="a" onClick={() => changeRoute("/panel/privelege")}>
								<Icon name="money" />
								{translated ? "Привилегия" : "Privelege"}
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
						<p>
							{storageInfo
								? `${Math.round(storageInfo.sizeUsed)} MB of ${Math.round(
										storageInfo.sizeMax,
								  )} MB used`
								: translated
								? "Пожалуйста, выберите группу или присоединитесь к новой!"
								: "Please, select group or join one!"}
						</p>
					</Col>
				</Row>
				<hr className={s.hrStyled} />
				<Row>
					<Col className={classNames(s.col, s.groupBot)}>
						<span className={s.groupInfo}>
							<p className={s.pStyled}>Current Group</p>
						</span>
						{groupOwnage &&
							currentGroupInfo &&
							groupOwnage.id === currentGroupInfo.id &&
							(translated ? "Вы владелец" : "You own this group")}
						<Dropdown
							placeholder={translated ? "Выберите группу" : "Select group"}
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
	);
};

export { PanelNavigationComponent };
