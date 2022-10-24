import React from 'react';

const Navbar = ({ isLogged, logout }) => {
	return (
		<div>
			<nav class="header">
				<p class="logo">
					<a href="/">Timbratura</a>
				</p>
				<ul class="main-nav">
					{isLogged ? (
						<li>
							<a onClick={logout}>Logout</a>
						</li>
					) : (
						<li>
							<a href="/login">Login</a>
						</li>
					)}{' '}
					{isLogged ? null : (
						<li>
							<a href="/registrazione">Registrazione</a>
						</li>
					)}{' '}
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
