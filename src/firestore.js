import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyC57YogOVtRucMzotUcxDSXohk-4J6GDd0",
authDomain: "maze-969d8.firebaseapp.com",
databaseURL: "https://maze-969d8.firebaseio.com",
projectId: "maze-969d8",
storageBucket: "maze-969d8.appspot.com",
messagingSenderId: "939257281153",
appId: "1:939257281153:web:17a058473a9ce357452b80"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()