import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCUsdzag6kqlqZ_kshGdDluclR6jC_6nFw",
    authDomain: "dgya-fb.firebaseapp.com",
    projectId: "dgya-fb",
    storageBucket: "dgya-fb.appspot.com",
    messagingSenderId: "793437038075",
    appId: "1:793437038075:web:3602e9004388938340d75e"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;