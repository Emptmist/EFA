// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlFDLExfsfdM_tEXsWyfQZ7R8qpv5Fevk",
  authDomain: "efa-settings.firebaseapp.com",
  projectId: "efa-settings",
  storageBucket: "efa-settings.firebasestorage.app",
  messagingSenderId: "493087433661",
  appId: "1:493087433661:web:ff912eac0448888d0268d4",
  measurementId: "G-6QTQWJBTV7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth();
export const db=getFirestore(app);
export default app;