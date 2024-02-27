// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDkVWWgpRk8ek8cw2Q7RcAHcNGaQQjGx8",
  authDomain: "novelsounds-d1dd6.firebaseapp.com",
  projectId: "novelsounds-d1dd6",
  storageBucket: "novelsounds-d1dd6.appspot.com",
  messagingSenderId: "734145197682",
  appId: "1:734145197682:web:588e6aad9f6e7c1e24f4eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;