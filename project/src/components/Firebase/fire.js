import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import axios from "axios";
import io from "socket.io-client";
const socket = io("http://localhost:3030");

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

	// Return list of .mp4 pertaining the user
	getAllPosts = async () => {

		let r = await axios.get(databaseURL + "posts/");
		console.log(r);
		let ret = [];
		for (let i = 0; i < r.data.length; i++) {
			// console.log(r.data[i])
			ret.push(r.data[i]);
		}

		console.log("ret length: ", ret.length);
		for (var i = 0; i < ret.length; i++) {
			console.log("ret", ret[i]);
			ret[i].videoURL = await this.doGrabFile(ret[i].video);
			console.log("ret", ret[i], "video: ", ret[i].video);
		}
		return ret;
	};



	// Return list of .mp4 pertaining the user
	getUserPosts = async (uid) => {
		console.log(uid);

		let userDB = await fetch(databaseURL + "user/" + uid); // Get all posts ID associated with User
		// console.log(userDB.text());

		let userProf = await userDB.json();
		let ret = [];

		console.log("userprof", userProf);

		for (let i = 0; i < userProf.posts.length; i++) {
			console.log("userprof.posts", userProf.posts[i]);
			let rawPost = await fetch(databaseURL + "posts/" + userProf.posts[i]);
			let post = await rawPost.json();
			console.log("postall", post);
			//let videoURL1 = await this.doGrabFile(post.video);
			ret.push(post);
		}

		console.log("ret length: ", ret.length);
		for (var i = 0; i < ret.length; i++) {
			console.log("ret", ret[i]);
			// let videoURL1 = await this.doGrabFile(ret[i].video);
			ret[i].videoURL = await this.doGrabFile(ret[i].video);
			console.log("ret", ret[i], "video: ", ret[i].video);
		}
		return ret;
	};


	addLike = async (postID) => {
		var timestamp = new Date();
		await fetch(databaseURL + "posts/addLike/" + postID);
		console.log("EMITTING FOR LIKE");
		setTimeout(() => {
			socket.emit("like", timestamp);
		}, 500);
	};

	getLikes = async (postID) => {
		let likesDB = await fetch(databaseURL + "posts/getLikes/" + postID);
		let postLikes = await likesDB.json();
		return postLikes;
	};

	postComment = async (com, id) => {
		console.log("text to be uploaded", com);
		var timestamp = new Date();
		// Post comment
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				UID: this.auth.currentUser.uid,
				text: com,
			}),
		};
		fetch(databaseURL + "posts/comment/" + id, requestOptions)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
		console.log("EMITTING FOR COMMENT");
		setTimeout(() => {
			socket.emit("comment", timestamp);
		}, 500);
	};

	getComments = async (postID) => {
		let commentsDB = await fetch(databaseURL + "posts/comment/" + postID); // Get all comments associated with postID
		let postComments = await commentsDB.json();
		return postComments;
	};

	// Get a user by display name
	doGetUser = async (displayName) => {
		let allUsersDB = await fetch(databaseURL + "user/");
		let allUsers = await allUsersDB.json();
		for (let i = 0; i < allUsers.length; i++) {
			let temp = allUsers[i];
			if (temp.displayName === displayName) {
				console.log("user found!");
				return temp.displayName;
			}
		}
		console.log("username not found :(");
		return null;
	}

	getName = async (uid) => {
		/*
		firebase
			.database()
			.ref("users/" + uid)
			.once("value", (snap) => {
				var data = snap.val();
				console.log(data);
				return data;
			});
			*/
	};

	doGrabFile = (name) => {
		const image = firebase.storage().ref().child(name);
		return image.getDownloadURL();
	};

	doSubmitFile = (file, name) => {
		console.log("SUBMITTING FILE...");
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
		const uploadTask = storeRef.put(file, metadata);
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (
			snapshot
		) {
			var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log(percent + "% DONE");
			if (percent === 100) {
				const requestOptions = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						UID: id,
						video: String(timestamp),
						author: name,
					}),
				};
				console.log("ID is " + id);
				fetch(databaseURL + "posts", requestOptions)
					.then((response) => response.json())
					.then((data) => console.log(data))
					.catch((err) => console.log(err));
				console.log("Uploaded a blob or file!");
				console.log("UPLOAD COMPLETE, EMITTING...");
				setTimeout(() => {
					socket.emit("upload", timestamp);
				}, 4000);
			}
		});
	};

	// Gets all DM conversation threads associated with that user
	doGetUserDMConvos = async (name) => {
		let convos = [];
		let userDB = await fetch(databaseURL + "convos/" + name); // Get all posts ID associated with User

		return convos;
	}

	doGetConvoMessages = async (name, recipient) => {
		let messages = [];
		this.db.ref("DMConvos/"+name+"/"+recipient).on("value", snapshot => {
			snapshot.forEach((snap) => {
				console.log("content: ", snap.val().content);
				messages.push(snap.val());
			});
		});
		return messages;
	}

	doTestSendDM = async (message, person1, person2) => {
		this.db.ref("DMConvos/"+person1+"/"+person2).push({
			content: message,
			timestamp: String(new Date()),
			sender: person1,
		});
		this.db.ref("DMConvos/"+person2+"/"+person1).push({
			content: message,
			timestamp: String(new Date()),
			sender: person1,
		});
	}

	// doSendDM = async (convoID) => {
	// 	let recipient = await this.doGetUser(displayName);
	// }

	doListenDM = async (convoID) => {

	}

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
