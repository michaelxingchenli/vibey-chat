import firebase from "firebase";

const config = {
  apiKey: "AIzaSyB1TCgPqj_zW06MuZAQEhjaqaTDwrzxagQ",
  authDomain: "chatter-67fe3.firebaseapp.com",
  databaseURL: "https://chatter-67fe3.firebaseio.com",
  projectId: "chatter-67fe3",
  storageBucket: "chatter-67fe3.appspot.com",
  messagingSenderId: "199080480777",
  appId: "1:199080480777:web:239ab17e928f8a099be8d8",
  measurementId: "G-B88PP952V7",
};

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
