import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// import 'firebase/messaging';
const databaseURL = process.env.REACT_APP_MONGO_URL;
const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APPID,
	measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// const config = {
//   apiKey: "AIzaSyAHkDGeM9tCKCIYyJ0pKL13fE-ICudCZ3M",
//   authDomain: "test1-cf3a2.firebaseapp.com",
//   databaseURL: "https://test1-cf3a2.firebaseio.com/",
//   projectId: "test1-cf3a2",
//   storageBucket: "test1-cf3a2.appspot.com",
//   messagingSenderId: "521660089302",
//   appId: "1:521660089302:web:b3a43bb3b0da115aa21a77",
//   measurementId: "G-CZ9SCS5DQK"
// };

class fire {
	constructor() {
		//console.log(process.env);
		firebase.initializeApp(config);

		/* Helper */

		this.emailAuthProvider = firebase.auth.EmailAuthProvider;

		this.auth = firebase.auth();
		this.db = firebase.database();
		const storage = firebase.storage();
		this.storageRef = storage.ref();

		/* Social Sign In Method Provider */
		/*
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
    */
		//export const storage = firebase.storage()
		//export const storageRef = storage.ref();
	}
	getVidList = async (uid) => {
		let ret = [];
		let refToPath = this.db.ref(`posts/${uid}`);
		let snap = await refToPath.once("value");
		let names = Object.keys(snap.val());
		for (var i = 0; i < names.length; i++) {
			let url = await this.doGrabFile(names[i]);
			ret.push(url);
		}

		console.log(ret[0]);
		return ret;
	};

	doGrabFile = (name) => {
		const image = firebase.storage().ref().child(name);
		let testing = image.getDownloadURL();
		return testing;
	};

	doSubmitFile = (file) => {
		var timestamp = new Date();
		console.log(timestamp);
		let storeRef = this.storageRef.child(String(timestamp));
		let id = this.auth.currentUser.uid;
		var metadata = {
			customMetadata: {
				uid: id,
			},
		};
		// Updating metadata
		storeRef.put(file, metadata).then(function (snapshot) {
			// After we uploaded to firebase we will upload to our mongo database to link them!
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					UID: id,
					video: String(timestamp),
					author: id,
				}),
			};
			console.log("ID is " + id);
			fetch(databaseURL + "/posts", requestOptions)
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((err) => console.log(err));
			console.log("Uploaded a blob or file!");
		});
	};

	doCreateUserWithEmailAndPassword = (email, password) => {
		return this.auth.createUserWithEmailAndPassword(email, password);
	};

	doSendEmailVerification = () => {
		this.auth.currentUser.sendEmailVerification({
			url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
		});
	};

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);
	/*

 doSignInWithGoogle = () =>
  this.auth.signInWithPopup(this.googleProvider);

doSignInWithFacebook = () =>   this.auth.signInWithPopup(this.facebookProvider);

doSignInWithTwitter = () =>
  this.auth.signInWithPopup(this.twitterProvider)

*/

	doSignOut = () => this.auth.signOut();

	doPasswordUpdate = (password) =>
		this.auth.currentUser.updatePassword(password);

	doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
	doPasswordUpdate = (password) =>
		this.auth.currentUser.updatePassword(password);

	// *** Merge Auth and DB User API *** //

	onAuthUserListener = (next, fallback) =>
		this.auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				console.log("The authenticated user is: ");
				console.log(authUser);
				this.user(authUser.uid)
					.once("value")
					.then((snapshot) => {
						const dbUser = snapshot.val();
						// merge auth and db user
						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							emailVerified: authUser.emailVerified,
							//providerData: authUser.providerData,
							...dbUser,
						};

						next(authUser);
					});
			} else {
				fallback();
			}
		});

	// *** User API ***

	user = (uid) => this.db.ref(`users/${uid}`);

	users = () => this.db.ref("users");
	/*
    // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
  */
}

export default fire;
