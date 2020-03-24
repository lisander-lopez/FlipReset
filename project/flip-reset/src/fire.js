import firebase from 'firebase';
 


const config = {
  apiKey: "AIzaSyAHkDGeM9tCKCIYyJ0pKL13fE-ICudCZ3M",
  authDomain: "test1-cf3a2.firebaseapp.com",
  databaseURL: "https://test1-cf3a2.firebaseio.com",
  projectId: "test1-cf3a2",
  storageBucket: "test1-cf3a2.appspot.com",
  messagingSenderId: "521660089302",
  appId: "1:521660089302:web:b3a43bb3b0da115aa21a77",
  measurementId: "G-CZ9SCS5DQK"
};

  const fire = firebase.initializeApp(config);
  export default fire;

