import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCwTp2ixPnAe1Hj5_gjkBo6Gj8UrwxCP2Q',
	authDomain: 'app-timbratura.firebaseapp.com',
	projectId: 'app-timbratura',
	storageBucket: 'app-timbratura.appspot.com',
	messagingSenderId: '933470805520',
	appId: '1:933470805520:web:d1bce13c39f1268348f495',
	measurementId: 'G-P7WE94X9QX',
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
	firebase
		.firestore()
		.settings({ experimentalForceLongPolling: true, useFetchStreams: false });
} else {
	app = firebase.app();
	firebase
		.firestore()
		.settings({ experimentalForceLongPolling: true, useFetchStreams: false });
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
