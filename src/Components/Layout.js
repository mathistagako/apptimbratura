import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ isLogged, logout }) => {
	return (
		<>
			<Navbar isLogged={isLogged} logout={logout} />
			<Outlet />
		</>
	);
};

export default Layout;
