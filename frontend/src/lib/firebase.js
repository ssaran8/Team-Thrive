// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN5r2bdDgMTpC1EEmbpm7i4ffDXxwW20U",
  authDomain: "thrive-b3588.firebaseapp.com",
  projectId: "thrive-b3588",
  storageBucket: "thrive-b3588.appspot.com",
  messagingSenderId: "255429101371",
  appId: "1:255429101371:web:e6a70692fcab6848d9d91e",
  measurementId: "G-NXTEH4FKQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore(app);

export const signInWithEmail = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    fetch('localhost:3001', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "uid": res.user.uid })
    })
      .then(response => response.json())
      .then(response => console.log(JSON.stringify(response)))
    console.log(res)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

export const logOut = () => {
  signOut(auth);
}