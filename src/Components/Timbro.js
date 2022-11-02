import axios from 'axios';
import { getAuth } from 'firebase/auth';
import moment from 'moment';
import 'moment/locale/it';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { db } from './Firebase';
moment.locale('it');

const Timbro = ({ isLogged, email }) => {
	const [giornate, setGiornate] = useState([]);
	const [refreshEffect, setRefreshEffect] = useState(0);

	let d = moment().locale('it').format('l');

	//LARAVEL DOCKER

	useEffect(() => {
		axios
			.post('http://localhost/getGiornate', {
				email: email,
			})
			.then((response) => {
				console.log(response.data);
				setGiornate(response.data);
			})
			.catch((error) => {
				console.log('ERROR:: ', error.response.data);
			});
	}, [refreshEffect, email]);

	//FIREBASE

	// const Ref = db
	// 	.collection('users')
	// 	.doc(getAuth().currentUser.email)
	// 	.collection('giornate')
	// 	.doc(d.replace('/', ' ').replace('/', ''));

	// useEffect(() => {
	// 	const unsubscribe = db
	// 		.collection('users')
	// 		.doc(getAuth().currentUser.email)
	// 		.collection('giornate')
	// 		.onSnapshot((snapshot) =>
	// 			setGiornate(
	// 				snapshot.docs.map((doc) => ({
	// 					id: doc.id,
	// 					data: doc.data(),
	// 				}))
	// 			)
	// 		);
	// 	return unsubscribe;
	// }, []);

	const checkEntrata = () => {
		let d = moment().locale('it').format('l');
		let time = moment().locale('it').format('LTS');

		//LARAVEL DOCKER

		axios
			.post('http://localhost/timbroEntrata', {
				email: email,
				date: d,
				orarioEntrata: time,
			})
			.then((response) => {
				console.log(JSON.stringify(response.data));
				setRefreshEffect(refreshEffect + 1);
			})
			.catch((error) => {
				console.log('ERROR:: ', error.response.data);
			});

		// Ref.get().then((docSnapshot) => {
		// 	if (docSnapshot.exists) {
		// 		console.log('Gia timbrato');
		// 		console.log(d);
		// 		console.log(time);
		// 	} else {
		// 		db.collection('users')
		// 			.doc(getAuth().currentUser.email)
		// 			.collection('giornate')
		// 			.doc(d.replace('/', ' ').replace('/', ''))
		// 			.set({
		// 				date: d,
		// 				orarioEntrata: time,
		// 				orarioUscita: 0,
		// 			});

		// 		console.log(d.replace('/', '').replace('/', ''));
		// 		console.log(time);
		// 		console.log(getAuth().currentUser.email);
		// 	}
		// });

		console.log(giornate);
	};

	const checkUscita = async () => {
		let d = moment().locale('it').format('l');
		let time = moment().locale('it').format('LTS');
		let oreSuperate;

		//LARAVEL DOCKER

		axios
			.post('http://localhost/timbroUscita', {
				email: email,
				date: d,
				orarioUscita: time,
			})
			.then((response) => {
				console.log(response.data);
				oreSuperate = response.data;
				setRefreshEffect(refreshEffect + 1);
			})
			.catch((error) => {
				console.log('ERROR:: ', error.response.data);
			});

		//FIREBASE

		// Ref.get().then((docSnapshot) => {
		// 	console.log(docSnapshot);
		// 	if (docSnapshot.get('orarioUscita') !== 0) {
		// 		console.log('Gia timbrato');
		// 		console.log(d);
		// 		console.log(time);
		// 	} else {
		// 		orarioEntrata = docSnapshot.get('orarioEntrata');
		// 		let oreLavorate =
		// 			parseInt(time.split(':'), 10) -
		// 			parseInt(orarioEntrata.split(':'), 10);

		// 		if (oreLavorate >= 8) {
		// 			oreSuperate = true;
		// 		} else if (oreLavorate < 8) {
		// 			oreSuperate = false;
		// 		}

		// 		db.collection('users')
		// 			.doc(getAuth().currentUser.email)
		// 			.collection('giornate')
		// 			.doc(d.replace('/', ' ').replace('/', ''))
		// 			.update({
		// 				orarioUscita: time,
		// 				oreLavorativeMinimeRaggiunte: oreSuperate,
		// 			});

		// 		console.log(d.replace('/', '').replace('/', ''));
		// 		console.log(time);
		// 		console.log(getAuth().currentUser.email);
		// 	}
		// });
	};

	return (
		<div>
			<div>
				<body style={{ backgroundColor: 'black' }}>
					<div className="Row" style={{ textAlign: 'left' }}>
						<div className="Column">
							<Calendar className="calendario" />
						</div>
						<div className="Column">
							<p style={{ textAlign: 'center' }}>
								<button className="button" onClick={checkEntrata}>
									Timbra cartellino entrata
								</button>
								<button className="button" onClick={checkUscita}>
									Timbra cartellino uscita
								</button>
							</p>
							<table
								id="datiTimbri"
								width="600"
								border="1"
								cellpadding="0"
								cellspacing="0"
							>
								<tr>
									<th>Entrata</th>
									<th>Uscita</th>
									<th>Giornata</th>
								</tr>
								{
									// LARAVEL DOCKER

									giornate.map(
										({
											orarioEntrata,
											orarioUscita,
											oreLavorativeRaggiunte,
											date,
										}) => (
											<tr>
												<td style={{ padding: '5px' }}>{orarioEntrata}</td>
												<td style={{ padding: '5px' }}>
													{orarioUscita === '0' ? '' : orarioUscita}
												</td>
												<td
													style={{ padding: '5px' }}
													className={
														oreLavorativeRaggiunte === null
															? ''
															: oreLavorativeRaggiunte
															? 'tante-ore'
															: 'poche-ore'
													}
												>
													{date}
												</td>
											</tr>
										)
									)
								}

								{
									// FIREBASE
									/*
								{giornate.map(({ id, data }) => (
									<tr key={id}>
										<td style={{ padding: '5px' }}>{data.orarioEntrata}</td>
										<td style={{ padding: '5px' }}>
											{data.orarioUscita === 0 ? '' : data.orarioUscita}
										</td>
										<td
											className={
												data.oreLavorativeMinimeRaggiunte
													? 'tante-ore'
													: 'poche-ore'
											}
										>
											{data.date}
										</td>
									</tr>
								))} */
								}
							</table>
						</div>
					</div>
				</body>
			</div>
		</div>
	);
};

export default Timbro;
