import { initializeApp } from "firebase/app";
import { getFirestore , collection, addDoc, query, where, onSnapshot,doc, deleteDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtQRY8kGa4XeUdeYikfhYmWIk0ZTGS1F4",
  authDomain: "react-e5a67.firebaseapp.com",
  projectId: "react-e5a67",
  storageBucket: "react-e5a67.appspot.com",
  messagingSenderId: "449696589125",
  appId: "1:449696589125:web:46cae809007c468aa50a2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{app,db,collection, addDoc, query, where, onSnapshot,doc, deleteDoc, updateDoc}