import { initializeApp } from "firebase/app";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app"
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBlFYuaySEgg7-MeaFz_LMyEdrR03BY_3k",
  authDomain: "mycodelab-410304.firebaseapp.com",
  databaseURL: "https://mycodelab-410304-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mycodelab-410304",
  storageBucket: "mycodelab-410304.appspot.com",
  messagingSenderId: "31662281107",
  appId: "1:31662281107:web:d3631646c81ce7b3d81866",
  measurementId: "G-7T51HLZ3P6"
};

const firestore = initializeApp(firebaseConfig)

const db = getFirestore(firestore);

export { firestore, db };
export const authService = getAuth();