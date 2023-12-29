// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT4-xk94sXTcp8Puvvir0CLMOUMvyfc7s",
  authDomain: "k-message-caba2.firebaseapp.com",
  projectId: "k-message-caba2",
  storageBucket: "k-message-caba2.appspot.com",
  messagingSenderId: "815905902635",
  appId: "1:815905902635:web:b76f5418e27000293d1a6e",
  measurementId: "G-LHXQ574EC2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
