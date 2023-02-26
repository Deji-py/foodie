// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, getFireStore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVEAPYASLx1ryB10csK3Q9Ku02J4kh5yc",
  authDomain: "foodie-9786c.firebaseapp.com",
  projectId: "foodie-9786c",
  storageBucket: "foodie-9786c.appspot.com",
  messagingSenderId: "413861364210",
  appId: "1:413861364210:web:01f3f5c487ef4cbb3c2b6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db };
