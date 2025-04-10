import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDNMAcdo96xO9W5V_VYMU9gCyf3eVGe9Y4",
  authDomain: "test-project-bfed6.firebaseapp.com",
  projectId: "test-project-bfed6",
  storageBucket: "test-project-bfed6.firebasestorage.app",
  messagingSenderId: "54574886205",
  appId: "1:54574886205:web:1c1fd4de52170aa0d26954",
  measurementId: "G-G0B0KZG2XC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
