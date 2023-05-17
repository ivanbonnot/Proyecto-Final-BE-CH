import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAZ6z8fxl1oNwMXPExXS11Zmw5TV9WDCSs",
    authDomain: "planeta3d-8794b.firebaseapp.com",
    projectId: "planeta3d-8794b",
    storageBucket: "planeta3d-8794b.appspot.com",
    messagingSenderId: "358871832700",
    appId: "1:358871832700:web:e6a224aebde47df23b51f9"
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);