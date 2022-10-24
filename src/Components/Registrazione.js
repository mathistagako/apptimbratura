import React, { useState } from 'react';

const Registrazione = ({ register }) => {
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
		<div>
			<body id="reg-log">
				<form class="form">
					<div class="title">Registrazione</div>
					<div class="subtitle">Crea il tuo account</div>
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
						value="Iscriviti"
						onClick={() => register(email, password)}
					></input>
				</form>
			</body>
		</div>
	);
};

export default Registrazione;
