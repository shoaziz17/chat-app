import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDlJ0sFj6PTaWR0oFZYchTpDGGw6nWr5x4",
  authDomain: "chat-app-f44e3.firebaseapp.com",
  projectId: "chat-app-f44e3",
  storageBucket: "chat-app-f44e3.appspot.com",
  messagingSenderId: "756585578279",
  appId: "1:756585578279:web:88795f7f56003630bef302",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)

