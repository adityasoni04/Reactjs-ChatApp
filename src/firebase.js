import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDnBTsoJKF5zJCXMOOEmjvAAmXf81Lb_6Q",
  authDomain: "chatapp-4b4c0.firebaseapp.com",
  projectId: "chatapp-4b4c0",
  storageBucket: "chatapp-4b4c0.appspot.com",
  messagingSenderId: "1075989401985",
  appId: "1:1075989401985:web:91f51cf69e536461c01880"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();