import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import React, { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "minbil-v1.firebaseapp.com",
  databaseURL: "https://minbil-v1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "minbil-v1",
  storageBucket: "minbil-v1.appspot.com",
  messagingSenderId: "667194415784",
  appId: "1:667194415784:web:0a8098236a56b84e14009d",
  measurementId: "G-103J6F7021"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);


// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}
