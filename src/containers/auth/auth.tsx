import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { AuthLoginComponent, AuthRegisterComponent } from "../../components/auth";
import { changeRoute } from "../../components/history";
import { useLocalStorage } from "../../hooks";
import { accessLogin, accessRegister } from "../../services/access";

const AuthContainer: React.FC = () => {
	const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);
	const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", null);
	const [errMessage, setErrMessage] = useState(null);
	const isActive = useRef(true);

	useEffect(() => {
		if (isActive.current === true && (accessToken || refreshToken)) {
			isActive.current = false;
			changeRoute("/panel");
		}
	}, [accessToken, refreshToken]);

	const setAccessRefresh = async ({ accessToken, refreshToken }) => {
		await setAccessToken(accessToken);
		await setRefreshToken(refreshToken);
	};

	const handleLogin = async (email, password) => {
		const res = await accessLogin({ email, password }).catch(async (err) => {
			if (err.message) {
				await setErrMessage(err.message);
			}
		});

		if (res && res.data) {
			await setAccessRefresh({ ...res.data.tokens });
		}
	};

	const handleRegister = async (email, password) => {
		const res = await accessRegister({ email, password }).catch(async (err) => {
			if (err.message) {
				await setErrMessage(err.message);
			}
		});

		if (res && res.data) {
			await setAccessRefresh({ ...res.data.tokens });
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
