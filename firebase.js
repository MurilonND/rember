// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDou3bBO3Ji7PVF--AxpIFSaozNl84rfJ4",
  authDomain: "rember-30d89.firebaseapp.com",
  projectId: "rember-30d89",
  storageBucket: "rember-30d89.appspot.com",
  messagingSenderId: "937819024758",
  appId: "1:937819024758:web:1be57349e401c06b2f9e57",
  measurementId: "G-P1V3D8SXC3"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTOR_DB = getFirestore(FIREBASE_APP);

