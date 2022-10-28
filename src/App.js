import axios from 'axios';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import { auth, db } from './Components/Firebase';
import Layout from './Components/Layout';
import Login from './Components/Login';
import Registrazione from './Components/Registrazione';
import Timbro from './Components/Timbro';
import './index.css';

export default function App() {
	const navigate = useNavigate();
	const [isLogged, setIsLogged] = useState(false);
	const [emailLogged, setEmailLogged] = useState('');

	//LOGIN LARAVEL DOCKER

	useEffect(() => {
		if (sessionStorage.getItem('email')) {
			setEmailLogged(sessionStorage.getItem('email'));
			setIsLogged(true);
		}
	}, []);

	//LOGIN FIREBASE

	// useEffect(() => {
	// 	const unsubscribe = auth.onAuthStateChanged((authUser) => {
	// 		if (authUser) {
	// 			navigate('/timbro');
	// 			setIsLogged(true);
	// 			setEmailLogged(getAuth().currentUser.email);
	// 		}
	// 	});

	// 	return unsubscribe;
	// }, []);

	const signIn = (email, password) => {
		//FIREBASE
		// auth
		// 	.signInWithEmailAndPassword(email, password)
		// 	.catch((error) => alert(error));
		//LARAVEL-DOCKER
		axios
			.post('http://localhost/login', {
				email: email,
				password: password,
			})
			.then((response) => {
				if (JSON.stringify(response.data) === '1') {
					console.log(response.data);
					setEmailLogged(email);
					setIsLogged(true);
					sessionStorage.setItem('email', email);
					navigate('/timbro');
				} else {
					console.log(response.data);
					console.log('Utente o password inesistente');
				}
			})
			.catch((error) => {
				console.log('ERROR:: ', error.response.data);
			});
	};
	const register = (email, password) => {
		// FIREBASE

		// auth.createUserWithEmailAndPassword(email, password).then((response) => {
		// 	console.log(response);
		// 	db.collection('users').doc(email).set({
		// 		email: email,
		// 	});
		// });

		//LARAVEL-DOCKER

		axios
			.post('http://localhost/register', {
				email: email,
				password: password,
			})
			.then((response) => {
				console.log(JSON.stringify(response.data));
				setEmailLogged(email);
				setIsLogged(true);
				sessionStorage.setItem('email', email);
			})
			.catch((error) => {
				console.log('ERROR:: ', error.response.data);
			});
	};

	const logout = () => {
		//FIREBASE
		// auth.signOut();

		setEmailLogged('');
		setIsLogged(false);
		sessionStorage.clear();
		navigate('/');
	};

	return (
		<Routes>
			<Route
				element={
					<Layout isLogged={isLogged} logout={logout} email={emailLogged} />
				}
			>
				<Route
					index
					element={
						isLogged ? <Navigate to="/timbro" /> : <Navigate to="/login" />
					}
				></Route>
				<Route
					path="/registrazione"
					element={
						isLogged ? (
							<Navigate to="/timbro" />
						) : (
							<Registrazione register={register} />
						)
					}
				></Route>
				<Route
					path="/login"
					element={
						isLogged ? <Navigate to="/timbro" /> : <Login login={signIn} />
					}
				></Route>
				<Route
					path="/timbro"
					element={
						isLogged ? (
							<Timbro isLogged={isLogged} email={emailLogged} />
						) : (
							<Navigate to="/login" />
						)
					}
				></Route>
			</Route>
		</Routes>
	);
}
