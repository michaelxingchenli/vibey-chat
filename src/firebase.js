import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDuQ1l5VTcFcC1MS4muHr8y-8zhBCssUb8",
  authDomain: "vibey-chat.firebaseapp.com",
  databaseURL: "https://vibey-chat.firebaseio.com",
  projectId: "vibey-chat",
  storageBucket: "vibey-chat.appspot.com",
  messagingSenderId: "455813846997",
  appId: "1:455813846997:web:ad7a7f0d41d60f7fc98f5c",
  measurementId: "G-TN8185N7WL",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
