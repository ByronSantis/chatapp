import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCm6HdSRW7JbAb8DGb_ipg9_q5qDaJHk6s",
  authDomain: "chatapp-5491d.firebaseapp.com",
  databaseURL: "https://chatapp-5491d-default-rtdb.firebaseio.com",
  projectId: "chatapp-5491d",
  storageBucket: "chatapp-5491d.appspot.com",
  messagingSenderId: "1065878472755",
  appId: "1:1065878472755:web:765114ee385bd869dfbb46"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();