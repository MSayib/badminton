import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
// eslint-disable-next-line no-var
var firebaseConfig = {
  apiKey: "AIzaSyBgF8AJ9SLu02a20s3kjduw6zUbVtzZ6l8",
  authDomain: "badminton-tetamba-junior.firebaseapp.com",
  databaseURL: "https://badminton-tetamba-junior.firebaseio.com",
  projectId: "badminton-tetamba-junior",
  storageBucket: "badminton-tetamba-junior.appspot.com",
  messagingSenderId: "425610018769",
  appId: "1:425610018769:web:ffe8f96168bb8fc7252af0",
  measurementId: "G-SJJEJK5YSF"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}
export default firebase.firestore();
