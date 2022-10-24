import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Timbro = () => {
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
								<button className="button" onClick>
									Timbra cartellino entrata
								</button>
								<button className="button" onClick>
									Timbra cartellino uscita
								</button>
							</p>
							<br />
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
								<tr></tr>
							</table>
						</div>
					</div>
				</body>
			</div>
		</div>
	);
};

export default Timbro;
