import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import React, { Component } from "react";
const provider = new GoogleAuthProvider();

export default class GoogleAuth extends Component {

  constructor() {
    super(); // Llamar al constructor de la clase base

    // Bind para asegurar que el método tenga el contexto correcto
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.logout = this.logout.bind(this);
  };

  loginWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

}