import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBlFYuaySEgg7-MeaFz_LMyEdrR03BY_3k",
  authDomain: "mycodelab-410304.firebaseapp.com",
  databaseURL: "https://mycodelab-410304-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mycodelab-410304",
  storageBucket: "mycodelab-410304.appspot.com",
  messagingSenderId: "31662281107",
  appId: "1:31662281107:web:90c95ec68ac66573d81866",
  measurementId: "G-L6VNGP5WM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// firestore 객체 생성
const db = getFirestore(app);
export const authService = getAuth();
// firestore export
export {db}