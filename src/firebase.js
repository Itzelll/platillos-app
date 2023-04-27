import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeOu0TmPBOgJ0M_g8a0xoHE-KDWvPcjFo",
  authDomain: "platillos-app.firebaseapp.com",
  projectId: "platillos-app",
  storageBucket: "platillos-app.appspot.com",
  messagingSenderId: "693866329061",
  appId: "1:693866329061:web:6996c0d042ff37ab40750c"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const storage = firebase.storage();

export {
  storage, firestore as default
}