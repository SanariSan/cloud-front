import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthLoginComponent, AuthRegisterComponent } from "../../components/auth";
import { changeRoute } from "../../components/history";
import { reqAccessLogin, reqAccessRegister } from "../../services/access";
import { useAtom } from "@dbeining/react-atom";
import { keystoreAtom, updateKeystore } from "../../store/keystore";

const AuthContainer: React.FC = () => {
	const keystore = useAtom(keystoreAtom);
	const [errMessage, setErrMessage] = useState(null);
	const isActive = useRef(true);

	useEffect(
		() => () => {
			isActive.current = false;
		},
		[],
	);

	useEffect(() => {
		console.log(isActive);

		if (isActive.current === true && keystore.accessToken && keystore.refreshToken) {
			changeRoute("/panel");
		}
	}, [keystore]);

	const setAccessRefresh = async ({ accessToken, refreshToken }) => {
		if (isActive.current) {
			await updateKeystore(accessToken, refreshToken);
		}
	};

	const handleLogin = async (email, password) => {
		if (isActive.current) {
			const res = await reqAccessLogin({ email, password }).catch(async (err) => {
				if (err.message) {
					await setErrMessage(err.message);
				}
			});

			if (res && res.data) {
				await setAccessRefresh({ ...res.data.tokens });
			}
		}
	};

	const handleRegister = async (email, password) => {
		if (isActive.current) {
			const res = await reqAccessRegister({ email, password }).catch(async (err) => {
				if (err.message) {
					await setErrMessage(err.message);
				}
			});

			if (res && res.data) {
				await setAccessRefresh({ ...res.data.tokens });
			}
		}
	};

	return (
		<Switch>
			<Route
				exact
				path="/auth/register"
				render={(props) => (
					<AuthRegisterComponent
						handleRegister={handleRegister}
						errMessage={errMessage}
						setErrMessage={setErrMessage}
						{...props}
					/>
				)}
			/>
			<Route
				path="/auth"
				render={(props) => (
					<AuthLoginComponent
						handleLogin={handleLogin}
						errMessage={errMessage}
						setErrMessage={setErrMessage}
						{...props}
					/>
				)}
			/>
		</Switch>
	);
};

export { AuthContainer };
