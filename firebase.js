import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, push,set } from "firebase/database";

// Firebase-konfiguraatiotiedot
const firebaseConfig = {
  apiKey: "AIzaSyAa9tjLllGOK_kOpNJ7YCmce98Ez_RMatY",
  authDomain: "juhannus-1a551.firebaseapp.com",
  databaseURL: "https://juhannus-1a551-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "juhannus-1a551",
  storageBucket: "juhannus-1a551.appspot.com",
  messagingSenderId: "941786533998",
  appId: "1:941786533998:web:8649ca4d2449d74f62d67f",
  measurementId: "G-S21CXZ2BBP"
};

// Alustetaan Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, remove, push,set };
