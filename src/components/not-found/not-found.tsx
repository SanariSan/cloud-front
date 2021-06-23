import { useAtom } from "@dbeining/react-atom";
import React from "react";
import { Button, Image } from "semantic-ui-react";
import { translateAtom } from "../../store/translate";
import { changeRoute } from "../history";
import s from "./not-found.module.scss";
import img from "../../img/404.png";

const NotFound: React.FC = () => {
	const translated = useAtom(translateAtom);

	return (
		<div className={s.wrapGlobal}>
			<div className={s.top}>
				<Image src={img} size={"big"} />
			</div>
			<div className={s.bot}>
				<h1 className={s.h1Styled}>
					{translated
						? "Не найдено, а еще, может быть, у вас нет доступа!"
						: "Not Found or No Rights to access"}
				</h1>
				<Button color="violet" inverted className={s.btn} onClick={() => changeRoute("/")}>
					{translated ? "Вернуться на главную" : "Back to main"}
				</Button>
			</div>
		</div>
	);
};

export { NotFound };
