import React, { useEffect, useState } from 'react';

const Login = ({ login }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChange = (event) => {
		if (event.target.name === 'Email') {
			setEmail(event.target.value);
		}
		if (event.target.name === 'Password') {
			setPassword(event.target.value);
		}
	};

	return (
		<body id="reg-log">
			<div class="form">
				<div class="title">Accesso</div>
				<div class="subtitle">Accedi al tuo account</div>
				<div class="input-container ic1">
					<input
						name="Email"
						type="text"
						class="input"
						placeholder=" "
						value={email}
						onChange={handleChange}
					/>
					<div class="cut"></div>
					<label for="Email" class="placeholder">
						Email
					</label>
				</div>
				<div class="input-container ic2">
					<input
						name="Password"
						class="input"
						type="password"
						placeholder=" "
						value={password}
						onChange={handleChange}
					/>
					<div class="cut cut-short"></div>
					<label for="password" class="placeholder">
						Password
					</label>
				</div>
				<input
					class="submit"
					type="button"
					value="Accedi"
					onClick={() => login(email, password)}
				></input>
			</div>
		</body>
	);
};

export default Login;
