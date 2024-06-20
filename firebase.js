import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, push, set } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_ApiKey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  databaseURL: "https://juhannus-1a551-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, remove, push, set };
