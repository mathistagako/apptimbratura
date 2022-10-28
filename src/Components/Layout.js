import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ isLogged, logout, email }) => {
	return (
		<>
			<Navbar isLogged={isLogged} logout={logout} email={email} />
			<Outlet />
		</>
	);
};

export default Layout;
