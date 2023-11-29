import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBvSHjr8iz2K0niUBlNmRwifs4b_WFIVl4",
  authDomain: "peter-s-pte.firebaseapp.com",
  projectId: "peter-s-pte",
  storageBucket: "peter-s-pte.appspot.com",
  messagingSenderId: "65685455975",
  appId: "1:65685455975:web:08bb911d03eaaaa24c80c2",
  measurementId: "G-8VCW5R2J0K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
