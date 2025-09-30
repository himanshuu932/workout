// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// Note: You don't need getAnalytics for auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDROu3tdIMmMxOwVbYDYjemq5Q7IFb0tnw",
  authDomain: "workout-7364f.firebaseapp.com",
  projectId: "workout-7364f",
  storageBucket: "workout-7364f.firebasestorage.app",
  messagingSenderId: "383861715165",
  appId: "1:383861715165:web:93a620596be6a46818eb34",
  measurementId: "G-HRHEJSKWL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
export const db = getFirestore(app);