// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFcG6VRlkes7PUsR3xHT-WohruorKJIZw",
  authDomain: "first-jp.firebaseapp.com",
  projectId: "first-jp",
  storageBucket: "first-jp.firebasestorage.app",
  messagingSenderId: "1018006324961",
  appId: "1:1018006324961:web:72782c28c1e7d0942e19a0",
  measurementId: "G-G578E0DGFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);