import classNames from "classnames";
import React from "react";
import { Button, Segment } from "semantic-ui-react";
import s from "./block-intro.module.scss";

const Intro: React.FC = () => {
	return (
		<Segment>
			<div className={s.intro}>
				<h1 className={classNames("light")}>Big and attractive</h1>
				<hr />
				<p className={classNames("light")}>
					Some fancy text just to fill this place, feel free to delete and replace
				</p>
				<Button inverted color="blue">
					LEARN MORE
				</Button>
				<div className={s.overlay} />
			</div>
		</Segment>
	);
};

export { Intro };
