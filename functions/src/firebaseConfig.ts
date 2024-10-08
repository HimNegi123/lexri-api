// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import * as dotenv from 'dotenv';
dotenv.config();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIRE_KEY,
  authDomain: "lexriapp.firebaseapp.com",
  projectId: "lexriapp",
  storageBucket: "lexriapp.appspot.com",
  messagingSenderId: "483783451101",
  appId: "1:483783451101:web:4b908df0903b7491269634",
  measurementId: "G-5VF2NQMMCE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

// Export the Firestore instance
export default db;