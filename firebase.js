// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_aUh8W-H78AgmJCQrhd_vIbDEokWtLOM",
  authDomain: "fir-nextjs-906be.firebaseapp.com",
  projectId: "fir-nextjs-906be",
  storageBucket: "fir-nextjs-906be.appspot.com",
  messagingSenderId: "125064213709",
  appId: "1:125064213709:web:e1bd86d62104c0b5856584"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage()

export {app,db,storage}