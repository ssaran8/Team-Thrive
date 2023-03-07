// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
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
const storage = getStorage();

export const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res)
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

export const logOut = () => {
  signOut(auth);
}

// storage
export async function upload(file, currentUser, setLoading){
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded");
}