import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { auth } from './Components/Firebase';
import Layout from './Components/Layout';
import Login from './Components/Login';
import Registrazione from './Components/Registrazione';
import Timbro from './Components/Timbro';
import './index.css';

export default function App() {
	const navigate = useNavigate();
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				navigate('/timbro');
				setIsLogged(true);
			}
		});

		return unsubscribe;
	}, []);

	const signIn = (email, password) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error));
	};

	const register = (email, password) => {
		auth.createUserWithEmailAndPassword(email, password).then((response) => {
			console.log(response);
		});
	};

	const logout = () => {
		auth.signOut();
		setIsLogged(false);
		navigate('/');
	};

	return (
		<Routes>
			<Route element={<Layout isLogged={isLogged} logout={logout} />}>
				<Route
					index
					element={isLogged ? <Timbro /> : <Login login={signIn} />}
				></Route>
				<Route
					path="/registrazione"
					element={<Registrazione register={register} />}
				></Route>
				<Route path="/login" element={<Login login={signIn} />}></Route>
				<Route path="/timbro" element={<Timbro />}></Route>
			</Route>
		</Routes>
	);
}
