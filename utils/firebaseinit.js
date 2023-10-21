import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAgElO9-O8W5A2fDeLkOvzrRL4YW8oKsDY",
  authDomain: "pte-test-9b7a2.firebaseapp.com",
  projectId: "pte-test-9b7a2",
  storageBucket: "pte-test-9b7a2.appspot.com",
  messagingSenderId: "967441196781",
  appId: "1:967441196781:web:91496d704155f39f670ee4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
