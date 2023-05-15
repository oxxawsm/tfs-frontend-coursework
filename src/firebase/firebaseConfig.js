// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import firebase from "firebase/app" 
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import "firebase/auth";
// import configureStore from "../store";

// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDgHRsovluzb78IWKS0PunV8AtCBdfK6dQ",
  authDomain: "oxxawsm-coursework.firebaseapp.com",
  projectId: "oxxawsm-coursework",
  storageBucket: "oxxawsm-coursework.appspot.com",
  messagingSenderId: "74832170748",
  appId: "1:74832170748:web:620ae25b241f09e70a1179",
  measurementId: "G-HBZTMZSTMS"
};

export const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const Firebase = getFirestore(app);
export const auth = getAuth(app)